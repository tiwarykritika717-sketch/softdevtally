import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ylvpdgfvgfdinyjcsudi.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdnBkZ2Z2Z2ZkaW55amNzdWRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTM0ODQ1NywiZXhwIjoyMDk0OTI0NDU3fQ.nrMyobQo2U3xTQgDWCEMngJEoucDL1i5Zl6SKwgwETQ';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

async function run() {
  const { data: students } = await supabaseAdmin.from('students').select('*').ilike('name', '%Sanjay%');
  console.log("=== STUDENTS ===");
  console.dir(students);
  const studentIds = students?.map(s => s.id) || [];
  
  if (studentIds.length > 0) {
    const { data: payments } = await supabaseAdmin.from('fee_payments').select('*').in('student_id', studentIds);
    console.log("=== PAYMENTS ===");
    console.dir(payments, { depth: null });
  }
}

run();
