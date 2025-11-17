import React, { useState, useEffect } from 'react';
import type { Contact, CrmReport } from '../types';
import { generateCrmReport } from '../services/geminiService';
import { supabase } from '../services/supabase';
import FinancialMatrix from './FinancialMatrix';

const Money: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [generatingForIds, setGeneratingForIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
        const { data, error } = await supabase.from('contacts').select('*');
        if (error) {
            console.error("Failed to fetch contacts for Money view", error);
            setError("Could not load contacts.");
        } else if (data) {
            setContacts(data as Contact[]);
        }
    };
    fetchContacts();
  }, []);


  const handleGenerateReport = async (contactToUpdate: Contact) => {
    if (!contactToUpdate.birthDate) {
        alert("Please provide a birth date to generate a report.");
        return;
    }
    setGeneratingForIds(prev => [...prev, contactToUpdate.id]);
    setError(null);
    try {
      const report = await generateCrmReport(contactToUpdate);
      const updatedData = { 
          report, 
          financialCycleTheme: report.financialMatrix?.financialCycleTheme 
      };

      const { data, error: updateError } = await supabase
          .from('contacts')
          .update(updatedData)
          .eq('id', contactToUpdate.id)
          .select();

      if (updateError) throw updateError;
      
      if (data) {
        setContacts(prevContacts => prevContacts.map(c => 
          c.id === contactToUpdate.id 
              ? data[0]
              : c
        ));
      }

    } catch (err) {
      setError('Failed to generate report. Please try again.');
      console.error(err);
    } finally {
      setGeneratingForIds(prev => prev.filter(id => id !== contactToUpdate.id));
    }
  };

  return (
    <FinancialMatrix
      contacts={contacts}
      onGenerateReport={handleGenerateReport}
      generatingForIds={generatingForIds}
    />
  );
};

export default Money;