// "use client";

// import { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';
// import { toast } from 'react-hot-toast';

// type ClickData = { date: string; count: number };

// export default function ClickTrendChart({ slug }: { slug: string }) {
//   const [data, setData] = useState<ClickData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         console.log(`📊 Fetching analytics for slug: ${slug}`);

//         const response = await fetch(`/api/links/analytics/${slug}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const json = await response.json();
//         console.log('📈 Analytics data received:', json);

//         if (!json.clickData) {
//           throw new Error('No clickData found in response');
//         }

//         setData(json.clickData);
//       } catch (err) {
//         console.error('Error fetching analytics:', err);
//         setError(err instanceof Error ? err.message : 'Failed to load analytics');
//         toast.error('Failed to load click data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) {
//       fetchData();
//     }
//   }, [slug]);

//   function exportToCSV(data: ClickData[], filename = 'click_report.csv') {
//     const csvRows = [
//       ['Date', 'Clicks'],
//       ...data.map((row) => [row.date, row.count.toString()]),
//     ];

//     const csvContent = csvRows.map((e) => e.join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });

//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = filename;
//     a.click();
//   }

//   function exportToPDF(data: ClickData[], filename = 'click_report.pdf') {
//     const doc = new jsPDF();
//     doc.text('Click Report', 10, 10);
//     doc.text(`Analytics for: ${slug}`, 10, 20);

//     data.forEach((row, i) => {
//       doc.text(`${row.date}: ${row.count} clicks`, 10, 30 + i * 10);
//     });

//     doc.save(filename);
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border-l-4 border-red-500 p-4">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm text-blue-700">No click data available yet. Your analytics will appear here once you get clicks.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-10 max-w-full mx-auto p-4 bg-white rounded-lg shadow">
//       <div className="h-64 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={data}
//             margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
//           >
//             <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
//             <XAxis 
//               dataKey="date" 
//               tick={{ fontSize: 12 }}
//               tickFormatter={(value) => {
//                 const date = new Date(value);
//                 return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//               }}
//             />
//             <YAxis 
//               tick={{ fontSize: 12 }}
//               allowDecimals={false}
//             />
//             <Tooltip
//               contentStyle={{ 
//                 backgroundColor: '#ffffff',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//               }}
//               labelFormatter={(value) => {
//                 const date = new Date(value);
//                 return date.toLocaleDateString('en-US', { 
//                   weekday: 'long', 
//                   year: 'numeric', 
//                   month: 'long', 
//                   day: 'numeric' 
//                 });
//               }}
//             />
//             <Line 
//               type="monotone" 
//               dataKey="count" 
//               stroke="#4f46e5" 
//               strokeWidth={2} 
//               dot={{ r: 4, fill: '#4f46e5' }}
//               activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="mt-6 flex justify-center space-x-4">
//         <button
//           onClick={() => exportToCSV(data)}
//           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Export to CSV
//         </button>
//         <button
//           onClick={() => exportToPDF(data)}
//           className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
//         >
//           Export to PDF
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast';

type ClickData = {
  date: string;
  count: number;
  formattedDate?: string;
};

export default function ClickTrendChart({ slug }: { slug: string }) {
  const [data, setData] = useState<ClickData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  function exportToCSV(data: ClickData[], filename = 'click_report.csv') {
    const csvRows = [
      ['Date', 'Clicks'],
      ...data.map((row) => [row.date, row.count.toString()]),
    ];

    const csvContent = csvRows.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }

  function exportToPDF(data: ClickData[], filename = 'click_report.pdf') {
    const doc = new jsPDF();
    doc.text('Click Report', 10, 10);
    doc.text(`Analytics for: ${slug}`, 10, 20);

    data.forEach((row, i) => {
      doc.text(`${row.date}: ${row.count} clicks`, 10, 30 + i * 10);
    });

    doc.save(filename);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/links/analytics/${slug}`, {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const result = await response.json();

        if (!result.clickData) {
          throw new Error('Invalid data format');
        }

        // Ensure data is properly formatted
        const formattedData = result.clickData.map((item: ClickData) => ({
          ...item,
          // Use formattedDate if available, otherwise format it
          formattedDate: item.formattedDate || new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        }));

        setData(formattedData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
        toast.error('Failed to load click data');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    } else {
      setError('No slug provided');
      setLoading(false);
    }
  }, [slug]);

  // ... (keep your exportToCSV and exportToPDF functions the same)

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
        <p className="text-blue-700">No click data available yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="formattedDate"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              labelClassName="font-bold"
              formatter={(value) => [`${value} clicks`, 'Count']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => exportToCSV(data)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Export CSV
        </button>
        <button
          onClick={() => exportToPDF(data)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}

