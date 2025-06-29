// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import { FiDownload } from "react-icons/fi";

// export type ClickDetail = {
//   timestamp: string;
//   country: string;
//   region: string;
//   city: string;
//   device: string;
//   ip: string;
// };

// type LinkDetailsCardProps = {
//   link: {
//     _id: string;
//     alias: string;
//   };
// };

// const LIMIT = 50; // Fetch 50 records per batch (can change to 100/200 etc.)

// export default function LinkDetailsCard({ link }: LinkDetailsCardProps) {
//   const [clickDetails, setClickDetails] = useState<ClickDetail[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const observer = useRef<IntersectionObserver | null>(null);
//   const lastElementRef = useCallback(
//     (node: HTMLTableRowElement | null) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage(prev => prev + 1);
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   const fetchDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/links/advAnalyticsFetch", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ alias: link.alias, page, limit: LIMIT }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to fetch analytics");
//       }

//       const data = await res.json();
//       setClickDetails(prev => [...prev, ...(data.clickDetails || [])]);
//       setHasMore(data.clickDetails.length === LIMIT);
//     } catch (err: unknown) {
//       if (err instanceof Error) setError(err.message);
//       else setError("Unknown error occurred");
//     } finally {
//       setLoading(false);
//     }
//   }, [link.alias, page]);

//   useEffect(() => {
//     fetchDetails();
//   }, [fetchDetails]);

//   const formatValue = (value: string) => (value === "Unknown" || !value ? "-" : value);

//   const downloadCSV = () => {
//     if (clickDetails.length === 0) return;

//     const header = ["Date", "Country", "Region", "City", "Device", "IP"];
//     const rows = clickDetails.map(detail => [
//       new Date(detail.timestamp).toLocaleString(),
//       formatValue(detail.country),
//       formatValue(detail.region),
//       formatValue(detail.city),
//       formatValue(detail.device),
//       formatValue(detail.ip),
//     ]);

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [header, ...rows].map(e => e.join(",")).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const linkElement = document.createElement("a");
//     linkElement.setAttribute("href", encodedUri);
//     linkElement.setAttribute("download", `${link.alias}_analytics.csv`);
//     document.body.appendChild(linkElement);
//     linkElement.click();
//     document.body.removeChild(linkElement);
//   };

//   return (
//     <div key={link._id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-800">
//           Advanced Analytics for <span className="text-blue-600">{link.alias}</span>
//         </h3>
//         <button
//           onClick={downloadCSV}
//           className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
//         >
//           <FiDownload />
//           Download CSV
//         </button>
//       </div>

//       <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-gray-600">Date</th>
//               <th className="px-4 py-2 text-gray-600">Country</th>
//               <th className="px-4 py-2 text-gray-600">Region</th>
//               <th className="px-4 py-2 text-gray-600">City</th>
//               <th className="px-4 py-2 text-gray-600">Device</th>
//               <th className="px-4 py-2 text-gray-600">IP</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clickDetails.map((detail, index) => {
//               const isLastElement = index === clickDetails.length - 1;
//               return (
//                 <tr
//                   ref={isLastElement ? lastElementRef : null}
//                   key={index}
//                   className="border-t text-gray-600"
//                 >
//                   <td className="px-4 py-2">{new Date(detail.timestamp).toLocaleString()}</td>
//                   <td className="px-4 py-2">{formatValue(detail.country)}</td>
//                   <td className="px-4 py-2">{formatValue(detail.region)}</td>
//                   <td className="px-4 py-2">{formatValue(detail.city)}</td>
//                   <td className="px-4 py-2">{formatValue(detail.device)}</td>
//                   <td className="px-4 py-2">{formatValue(detail.ip)}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {loading && <p className="text-center py-4 text-gray-500">Loading more...</p>}
//         {error && <p className="text-center py-4 text-red-600">Error: {error}</p>}
//         {!hasMore && !loading && (
//           <p className="text-center py-4 text-gray-400">No more records.</p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FiDownload, FiGlobe, FiMapPin, FiMonitor, FiClock, FiChevronDown, FiChevronUp } from "react-icons/fi";

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

const LIMIT = 50;

const getEmojiFlag = (countryCode: string) => {
    if (!countryCode || countryCode === "Unknown") return "🌐";
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const getDeviceIcon = (device: string) => {
    if (device.includes("Mobile")) return "📱";
    if (device.includes("Tablet")) return "⌨️";
    if (device.includes("Windows") || device.includes("Mac")) return "💻";
    return "🖥️";
};

const formatValue = (value: string) => (value === "Unknown" || !value ? "-" : value);

export default function LinkDetailsCard({ link }: LinkDetailsCardProps) {
    const [clickDetails, setClickDetails] = useState<ClickDetail[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"table" | "map">("table");
    const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
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

    const toggleRow = (index: number) => {
        setExpandedRows(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

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

    const uniqueClickDetails = Array.from(new Map(
        clickDetails.map(item => [`${item.ip}-${item.device}`, item])
    ).values());

    return (
        <div key={link._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mx-auto w-full max-w-[95vw]">
            <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                    <div className="max-w-full overflow-hidden">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 truncate">
                            Analytics for <span className="text-blue-600">/{link.alias}</span>
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm mt-1">
                            {clickDetails.length} total clicks • {new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab("table")}
                            className={`flex-1 sm:flex-none px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition ${activeTab === "table" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            Table
                        </button>
                        <button
                            onClick={() => setActiveTab("map")}
                            className={`flex-1 sm:flex-none px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition ${activeTab === "map" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            Map
                        </button>
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white text-xs md:text-sm rounded-lg hover:bg-blue-700 transition shadow-sm"
                            disabled={clickDetails.length === 0}
                        >
                            <FiDownload size={14} />
                            <span className="hidden xs:inline">Export</span>
                        </button>
                    </div>
                </div>

                {activeTab === "table" ? (
                    <div className="overflow-hidden">
                        {/* Desktop/Tablet Table */}
                        {/* Desktop/Tablet Table */}
                        <div className="hidden sm:block">
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 max-h-[500px] overflow-y-auto custom-scrollbar">
                                    <table className="w-full min-w-[460px] table-fixed">
                                        <thead className="bg-gray-50 text-gray-600 sticky top-0">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Time</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">Location</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[30%]">Device</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">IP</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {uniqueClickDetails.map((detail, index) => (
                                                <tr
                                                    ref={index === uniqueClickDetails.length - 1 ? lastElementRef : null}
                                                    key={index}
                                                    className="hover:bg-gray-50 transition"
                                                >
                                                    <td className="px-3 py-2 overflow-hidden">
                                                        <div className="flex items-center gap-2">
                                                            <FiClock className="text-gray-400 flex-shrink-0" />
                                                            <div className="overflow-hidden">
                                                                <div className="text-gray-700 truncate text-xs sm:text-sm">
                                                                    {new Date(detail.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </div>
                                                                <div className="text-gray-500 truncate text-xxs sm:text-xs">
                                                                    {new Date(detail.timestamp).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-2 overflow-hidden">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg flex-shrink-0">{getEmojiFlag(detail.country)}</span>
                                                            <div className="overflow-hidden">
                                                                <div className="font-medium text-gray-900 truncate text-xs sm:text-sm">
                                                                    {formatValue(detail.city) || formatValue(detail.region)}
                                                                </div>
                                                                <div className="text-gray-500 truncate text-xxs sm:text-xs">
                                                                    {formatValue(detail.country)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-2 overflow-hidden">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg flex-shrink-0">{getDeviceIcon(detail.device)}</span>
                                                            <span className="text-gray-700 truncate block  overflow-hidden text-xs sm:text-sm max-w-[180px]"  >
                                                                {formatValue(detail.device)}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-2 overflow-hidden">
                                                        <span className="text-gray-700 truncate block text-xs sm:text-sm font-mono max-w-[150px]">
                                                            {formatValue(detail.ip)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        {/* Mobile Cards */}
                        <div className="block sm:hidden">
                            {uniqueClickDetails.map((detail, index) => (
                                <div
                                    ref={index === uniqueClickDetails.length - 1 ? lastElementRef : null}
                                    key={index}
                                    className="border border-gray-200 rounded-lg overflow-hidden mb-2"
                                >
                                    <div
                                        className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                                        onClick={() => toggleRow(index)}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="text-xl">{getDeviceIcon(detail.device)}</span>
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-800 truncate text-sm">
                                                    {formatValue(detail.device)}
                                                </p>
                                                <p className="text-gray-600 truncate text-xs">
                                                    {new Date(detail.timestamp).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{getEmojiFlag(detail.country)}</span>
                                            {expandedRows[index] ? <FiChevronUp className="text-gray-600" /> : <FiChevronDown className="text-gray-400" />}
                                        </div>
                                    </div>

                                    {expandedRows[index] && (
                                        <div className="p-3 pt-0 border-t border-gray-100 bg-gray-50 animate-fadeIn">
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div className="space-y-1">
                                                    <p className="text-gray-500 text-xs">Location</p>
                                                    <p className="font-medium flex items-center gap-1 text-sm">
                                                        <FiMapPin className="flex-shrink-0" />
                                                        <span className="truncate text-gray-700">
                                                            {formatValue(detail.city) || formatValue(detail.region)}
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-600 truncate text-xs">
                                                        {formatValue(detail.country)}
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-gray-500 text-xs">Date</p>
                                                    <p className="font-medium text-gray-700 text-sm">
                                                        {new Date(detail.timestamp).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="space-y-1 col-span-2">
                                                    <p className="text-gray-500 text-xs">IP Address</p>
                                                    <p className="font-mono text-gray-700 flex items-center gap-1 text-sm">
                                                        <FiGlobe className="flex-shrink-0" />
                                                        <span className="truncate">{formatValue(detail.ip)}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {loading && (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center text-sm">
                                Error: {error}
                            </div>
                        )}
                        {!hasMore && !loading && clickDetails.length > 0 && (
                            <div className="text-center py-3 text-gray-500 text-sm">
                                No more records available
                            </div>
                        )}
                        {uniqueClickDetails.length === 0 && !loading && !error && (
                            <div className="text-center py-6 text-gray-500">
                                <FiGlobe className="mx-auto text-2xl text-gray-400 mb-2" />
                                <p>No analytics data available yet</p>
                                <p className="text-xs mt-1">Your link hasn&#39;t been clicked yet</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="relative mb-4">
                                <FiGlobe className="text-gray-300 text-5xl" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FiMapPin className="text-blue-500" />
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-base font-medium text-gray-700">Geographic Distribution</h4>
                            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                                Visualize where your clicks are coming from around the world
                            </p>
                            <button
                                onClick={() => setActiveTab("table")}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition flex items-center gap-2"
                            >
                                <FiMonitor /> View Data Table
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}






