"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FiDownload } from "react-icons/fi";

export type ClickDetail = {
  timestamp: string;
  country: string;
  region: string;
  city: string;
  device: string;
  ip: string;
};

type LinkDetailsCardProps = {
  link: {
    _id: string;
    alias: string;
  };
};

const LIMIT = 50; // Fetch 50 records per batch (can change to 100/200 etc.)

export default function LinkDetailsCard({ link }: LinkDetailsCardProps) {
  const [clickDetails, setClickDetails] = useState<ClickDetail[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/links/advAnalyticsFetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias: link.alias, page, limit: LIMIT }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch analytics");
      }

      const data = await res.json();
      setClickDetails(prev => [...prev, ...(data.clickDetails || [])]);
      setHasMore(data.clickDetails.length === LIMIT);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [link.alias, page]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const formatValue = (value: string) => (value === "Unknown" || !value ? "-" : value);

  const downloadCSV = () => {
    if (clickDetails.length === 0) return;

    const header = ["Date", "Country", "Region", "City", "Device", "IP"];
    const rows = clickDetails.map(detail => [
      new Date(detail.timestamp).toLocaleString(),
      formatValue(detail.country),
      formatValue(detail.region),
      formatValue(detail.city),
      formatValue(detail.device),
      formatValue(detail.ip),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", encodedUri);
    linkElement.setAttribute("download", `${link.alias}_analytics.csv`);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  return (
    <div key={link._id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Advanced Analytics for <span className="text-blue-600">{link.alias}</span>
        </h3>
        <button
          onClick={downloadCSV}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
        >
          <FiDownload />
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-gray-600">Date</th>
              <th className="px-4 py-2 text-gray-600">Country</th>
              <th className="px-4 py-2 text-gray-600">Region</th>
              <th className="px-4 py-2 text-gray-600">City</th>
              <th className="px-4 py-2 text-gray-600">Device</th>
              <th className="px-4 py-2 text-gray-600">IP</th>
            </tr>
          </thead>
          <tbody>
            {clickDetails.map((detail, index) => {
              const isLastElement = index === clickDetails.length - 1;
              return (
                <tr
                  ref={isLastElement ? lastElementRef : null}
                  key={index}
                  className="border-t text-gray-600"
                >
                  <td className="px-4 py-2">{new Date(detail.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2">{formatValue(detail.country)}</td>
                  <td className="px-4 py-2">{formatValue(detail.region)}</td>
                  <td className="px-4 py-2">{formatValue(detail.city)}</td>
                  <td className="px-4 py-2">{formatValue(detail.device)}</td>
                  <td className="px-4 py-2">{formatValue(detail.ip)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {loading && <p className="text-center py-4 text-gray-500">Loading more...</p>}
        {error && <p className="text-center py-4 text-red-600">Error: {error}</p>}
        {!hasMore && !loading && (
          <p className="text-center py-4 text-gray-400">No more records.</p>
        )}
      </div>
    </div>
  );
}







