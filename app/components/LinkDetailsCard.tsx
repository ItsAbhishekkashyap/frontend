"use client";

import { useEffect, useState } from "react";

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
    alias: string; // Now using alias consistently
  };
};

export default function LinkDetailsCard({ link }: LinkDetailsCardProps) {
  const [clickDetails, setClickDetails] = useState<ClickDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/links/advAnalyticsFetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ alias: link.alias }), // sending alias correctly
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch analytics");
        }

        const data = await res.json();
        console.log("Fetched Analytics Data for alias:", link.alias, data);
        setClickDetails(data.clickDetails || []);
      } catch (err: unknown) {
        console.error(`Error fetching analytics for alias: ${link.alias}`, err);
        setClickDetails([]);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [link.alias]);

  const formatValue = (value: string) => (value === "Unknown" || !value ? "-" : value);

  return (
    <div key={link._id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Advanced Analytics for <span className="text-blue-600">{link.alias}</span>
      </h3>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading analytics...</p>
        ) : error ? (
          <p className="text-center py-4 text-red-600">Error: {error}</p>
        ) : (
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
              {clickDetails.length > 0 ? (
                clickDetails.map((detail, index) => (
                  <tr key={index} className="border-t text-gray-600">
                    <td className="px-4 py-2">{new Date(detail.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2">{formatValue(detail.country)}</td>
                    <td className="px-4 py-2">{formatValue(detail.region)}</td>
                    <td className="px-4 py-2">{formatValue(detail.city)}</td>
                    <td className="px-4 py-2">{formatValue(detail.device)}</td>
                    <td className="px-4 py-2">{formatValue(detail.ip)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No analytics data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}





