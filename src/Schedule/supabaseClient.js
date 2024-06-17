import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lgfyfbsajqevelhnyiak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZnlmYnNhanFldmVsaG55aWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3ODczNTcsImV4cCI6MjAzMzM2MzM1N30.miplvEdimTfLZXJP74SS4vpfgT5PSyJJ8pw1DPDFbpA';

export const supabase = createClient(supabaseUrl, supabaseKey);