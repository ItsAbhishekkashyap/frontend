import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';

type ClickData = { date: string; count: number };

export default function ClickTrendChart({ slug }: { slug: string }) {
  const [data, setData] = useState<ClickData[]>([]);

  useEffect(() => {
    fetch(`/api/links/analytics/${slug}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.clickData || []);
      });
  }, [slug]);

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

    data.forEach((row, i) => {
      doc.text(`${row.date}: ${row.count}`, 10, 20 + i * 10);
    });

    doc.save(filename);
  }

  return (
   <div style={{ marginBottom: '40px', maxWidth: 650, marginLeft: 'auto', marginRight: 'auto', fontFamily: 'Arial, sans-serif' }}>
  <LineChart width={600} height={300} data={data}>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#666' }} />
    <YAxis tick={{ fontSize: 12, fill: '#666' }} />
    <Tooltip
      contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: 4 }}
      itemStyle={{ color: '#8884d8' }}
    />
    <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
  </LineChart>

  <div style={{ marginTop: '20px', textAlign: 'center' }}>
    <button
      onClick={() => exportToCSV(data)}
      style={{
        marginRight: '15px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '600',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#4f46e5', // Indigo-600
        color: '#fff',
        transition: 'background-color 0.3s ease',
      }}
      onMouseOver={e => (e.currentTarget.style.backgroundColor = '#4338ca')} // Indigo-700
      onMouseOut={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
    >
      Export to CSV
    </button>

    <button
      onClick={() => exportToPDF(data)}
      style={{
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '600',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#10b981', // Emerald-500
        color: '#fff',
        transition: 'background-color 0.3s ease',
      }}
      onMouseOver={e => (e.currentTarget.style.backgroundColor = '#059669')} // Emerald-600
      onMouseOut={e => (e.currentTarget.style.backgroundColor = '#10b981')}
    >
      Export to PDF
    </button>
  </div>
</div>

  );
}

