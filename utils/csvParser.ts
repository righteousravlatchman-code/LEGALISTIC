import type { Contact } from '../types';

// Parses simple CSV or line-separated text.
// Expected format: Name,Birth Date,Birth Time,Birth Location
// Headers are optional. If not present, this order is assumed.
export const parseContactData = (textData: string): { contacts: Omit<Contact, 'id' | 'report'>[], errors: string[] } => {
    const lines = textData.trim().split('\n');
    const contacts: Omit<Contact, 'id' | 'report'>[] = [];
    const errors: string[] = [];
    let lineNum = 0;

    if (lines.length === 0 || (lines.length === 1 && lines[0].trim() === '')) {
        return { contacts, errors: ["No data provided."] };
    }

    const headerLine = lines[0].toLowerCase();
    let hasHeader = false;
    let nameIndex = 0, dateIndex = 1, timeIndex = 2, locationIndex = 3;

    if (headerLine.includes('name') && (headerLine.includes('date') || headerLine.includes('birthdate'))) {
        hasHeader = true;
        const headers = headerLine.split(',').map(h => h.trim().replace(/"/g, ''));
        nameIndex = headers.findIndex(h => h === 'name');
        dateIndex = headers.findIndex(h => h === 'birth date' || h === 'birthdate');
        timeIndex = headers.findIndex(h => h === 'birth time' || h === 'birthtime');
        locationIndex = headers.findIndex(h => h === 'birth location' || h === 'birthlocation');
        lineNum = 1;

        if (nameIndex === -1 || dateIndex === -1) {
            errors.push("CSV header is invalid. Make sure it contains at least 'name' and 'birth date'.");
            return { contacts, errors };
        }
    }

    const dataLines = hasHeader ? lines.slice(1) : lines;

    for (const line of dataLines) {
        lineNum++;
        if (!line.trim()) continue;

        // Simple CSV split, does not handle commas within quotes.
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));

        if (values.length < 2) {
            errors.push(`Line ${lineNum}: Not enough data. Expected at least Name, Birth Date.`);
            continue;
        }

        const name = values[nameIndex];
        const birthDate = values[dateIndex];

        if (!name || !birthDate) {
            errors.push(`Line ${lineNum}: Missing required fields (Name, Birth Date).`);
            continue;
        }
        
        // Basic date validation
        if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
             errors.push(`Line ${lineNum}: Invalid birth date format for '${name}'. Please use YYYY-MM-DD.`);
             continue;
        }

        const birthTime = timeIndex > -1 ? values[timeIndex] : undefined;
        const birthLocation = locationIndex > -1 ? values[locationIndex] : undefined;

        contacts.push({
            name,
            birthDate,
            birthTime: birthTime || undefined,
            birthLocation: birthLocation || undefined,
        });
    }

    return { contacts, errors };
};