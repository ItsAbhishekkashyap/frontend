import { useEffect, useState } from 'react';

export type ClickDetail = {
    timestamp: string;
    country?: string;
    region?: string;
    city?: string;
    device?: string;
    ip?: string;
};

type LinkDetailsCardProps = {
    link: {
        _id: string;
        alias: string;
    };
};

export default function LinkDetailsCard({ link }: LinkDetailsCardProps) {
    const [clickDetails, setClickDetails] = useState<ClickDetail[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch('/api/links/details', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ slug: link.alias }),
                });
                const data = await res.json();
                if (!data.error) {
                    setClickDetails(data.clickDetails || []);
                } else {
                    setClickDetails([]);
                }
            } catch (err) {
                console.error(`Error fetching click details for ${link.alias}:`, err);
                setClickDetails([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [link.alias]);

    const format = (value?: string) => (!value || value === 'Unknown' ? '-' : value);

    return (
        <div key={link._id} className="border border-gray-200 mb-4 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
                Click Trends for {link.alias}
            </h3>

            <div className="overflow-x-auto mt-4">
                {loading ? (
                    <p className="text-center py-4 text-gray-500">Loading details...</p>
                ) : (
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50">
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
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2">{new Date(detail.timestamp).toLocaleString()}</td>
                                        <td className="px-4 py-2">{format(detail.country)}</td>
                                        <td className="px-4 py-2">{format(detail.region)}</td>
                                        <td className="px-4 py-2">{format(detail.city)}</td>
                                        <td className="px-4 py-2">{format(detail.device)}</td>
                                        <td className="px-4 py-2">{format(detail.ip)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500">
                                        No detailed data available.
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

