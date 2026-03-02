'use client';

import { Card } from '@/components/ui/Card';
import {
  DocumentTextIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import {
  getReportsIndex,
  getRevenueReport,
  getBusPerformanceReport,
  getIncidentReport,
  getBookingStatsReport,
  type ReportInfo,
  type RevenueReport,
  type BusPerformance,
  type IncidentReportData,
  type BookingStats,
} from '@/services/api/reportsApi';

export default function OwnerReportsPage() {
  const { user, token } = useAuthStore();
  const { showToast } = useUiStore();
  const [mounted, setMounted] = useState(false);
  const [reports, setReports] = useState<ReportInfo[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Report data states
  const [revenueReport, setRevenueReport] = useState<RevenueReport | null>(null);
  const [busPerformance, setBusPerformance] = useState<BusPerformance[]>([]);
  const [incidentReport, setIncidentReport] = useState<IncidentReportData | null>(null);
  const [bookingStats, setBookingStats] = useState<BookingStats | null>(null);

  const iconMap: { [key: string]: React.ReactNode } = {
    'chart-bar': <ChartBarIcon className="h-6 w-6" />,
    'chart-line': <ArrowTrendingUpIcon className="h-6 w-6" />,
    'exclamation-triangle': <ExclamationTriangleIcon className="h-6 w-6" />,
    'ticket': <TicketIcon className="h-6 w-6" />,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadReports = async () => {
      if (!token) {
        showToast({ type: 'error', message: 'Authentication required' });
        return;
      }

      try {
        const data = await getReportsIndex(token);
        setReports(data.available_reports);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load reports';
        showToast({ type: 'error', message });
      }
    };

    loadReports();
  }, [mounted, token, showToast]);

  const loadRevenueReport = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getRevenueReport(token);
      setRevenueReport(data);
      setSelectedReport('revenue');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load revenue report';
      showToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const loadBusPerformanceReport = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getBusPerformanceReport(token);
      setBusPerformance(data);
      setSelectedReport('bus_performance');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load bus performance report';
      showToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const loadIncidentReport = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getIncidentReport(token);
      setIncidentReport(data);
      setSelectedReport('incidents');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load incident report';
      showToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const loadBookingStatsReport = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getBookingStatsReport(token);
      setBookingStats(data);
      setSelectedReport('bookings');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load booking stats';
      showToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user || user.role !== 'owner') {
    return <div className="p-6">Access denied. Owner only.</div>;
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      {!selectedReport ? (
        <>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Generate business and operational reports</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => {
                  if (report.id === 'revenue') loadRevenueReport();
                  else if (report.id === 'bus_performance') loadBusPerformanceReport();
                  else if (report.id === 'incidents') loadIncidentReport();
                  else if (report.id === 'bookings') loadBookingStatsReport();
                }}
                className="text-left hover:shadow-lg transition-shadow"
              >
                <Card className="p-4 sm:p-6 h-full flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                      {iconMap[report.icon] || <DocumentTextIcon className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{report.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{report.description}</p>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedReport(null);
                setRevenueReport(null);
                setBusPerformance([]);
                setIncidentReport(null);
                setBookingStats(null);
              }}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
            >
              ← Back
            </button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {reports.find((r) => r.id === selectedReport)?.name}
            </h1>
          </div>

          {loading ? (
            <Card className="p-8">
              <div className="text-center">Loading report...</div>
            </Card>
          ) : selectedReport === 'revenue' && revenueReport ? (
            <RevenueReportView data={revenueReport} />
          ) : selectedReport === 'bus_performance' && busPerformance.length > 0 ? (
            <BusPerformanceReportView data={busPerformance} />
          ) : selectedReport === 'incidents' && incidentReport ? (
            <IncidentReportView data={incidentReport} />
          ) : selectedReport === 'bookings' && bookingStats ? (
            <BookingStatsReportView data={bookingStats} />
          ) : (
            <Card className="p-8">
              <div className="text-center text-gray-600">No data available</div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function RevenueReportView({ data }: { data: RevenueReport }) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">
            Rs. {Math.round(data.summary.total_revenue)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Total Trips</p>
          <p className="text-2xl font-bold text-gray-900">{data.summary.total_trips}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-gray-900">{data.summary.cancelled_trips}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Completion Rate</p>
          <p className="text-2xl font-bold text-gray-900">{data.summary.completion_rate}%</p>
        </Card>
      </div>

      {/* Top Buses */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Buses</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Bus</th>
                <th className="px-4 py-2 text-right">Revenue</th>
                <th className="px-4 py-2 text-right">Trips</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.top_buses.map((bus) => (
                <tr key={bus.id}>
                  <td className="px-4 py-2">{bus.bus_number}</td>
                  <td className="px-4 py-2 text-right">Rs. {Math.round(bus.revenue)}</td>
                  <td className="px-4 py-2 text-right">{bus.trips}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        bus.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : bus.status === 'maintenance'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {bus.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Monthly Revenue */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-right">Revenue</th>
                <th className="px-4 py-2 text-right">Trips</th>
                <th className="px-4 py-2 text-right">Avg Fare</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.monthly_revenue.map((month) => (
                <tr key={month.month}>
                  <td className="px-4 py-2">{month.month}</td>
                  <td className="px-4 py-2 text-right">Rs. {Math.round(month.revenue)}</td>
                  <td className="px-4 py-2 text-right">{month.trips}</td>
                  <td className="px-4 py-2 text-right">Rs. {Math.round(month.avg_fare)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function BusPerformanceReportView({ data }: { data: BusPerformance[] }) {
  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Bus</th>
              <th className="px-4 py-2 text-right">Total Bookings</th>
              <th className="px-4 py-2 text-right">Completed</th>
              <th className="px-4 py-2 text-right">Cancelled</th>
              <th className="px-4 py-2 text-right">Rate</th>
              <th className="px-4 py-2 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((bus) => (
              <tr key={bus.id}>
                <td className="px-4 py-2">
                  <div>
                    <strong>{bus.bus_number}</strong>
                    <div className="text-xs text-gray-500">{bus.model}</div>
                  </div>
                </td>
                <td className="px-4 py-2 text-right">{bus.total_bookings}</td>
                <td className="px-4 py-2 text-right">{bus.completed_trips}</td>
                <td className="px-4 py-2 text-right">{bus.cancelled_trips}</td>
                <td className="px-4 py-2 text-right">
                  <span className="text-green-600 font-medium">{bus.completion_rate}%</span>
                </td>
                <td className="px-4 py-2 text-right">Rs. {Math.round(bus.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function IncidentReportView({ data }: { data: IncidentReportData }) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Total Incidents</p>
          <p className="text-2xl font-bold text-gray-900">{data.summary.total_incidents}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{data.summary.pending}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Resolved</p>
          <p className="text-2xl font-bold text-green-600">{data.summary.resolved}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Resolution Rate</p>
          <p className="text-2xl font-bold text-gray-900">{data.summary.resolution_rate}%</p>
        </Card>
      </div>

      {/* By Type */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Incidents by Type</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-right">Total</th>
                <th className="px-4 py-2 text-right">Resolved</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.by_type.map((incident, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 capitalize">{incident.type}</td>
                  <td className="px-4 py-2 text-right">{incident.count}</td>
                  <td className="px-4 py-2 text-right">{incident.resolved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function BookingStatsReportView({ data }: { data: BookingStats }) {
  return (
    <div className="space-y-6">
      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900">{data.booking_status.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Confirmed</p>
          <p className="text-2xl font-bold text-blue-600">{data.booking_status.confirmed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600">{data.booking_status.completed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-red-600">{data.booking_status.cancelled}</p>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Method</th>
                <th className="px-4 py-2 text-right">Count</th>
                <th className="px-4 py-2 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.payment_methods.map((method, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 capitalize">{method.payment_method?.replace('_', ' ') || 'N/A'}</td>
                  <td className="px-4 py-2 text-right">{method.count}</td>
                  <td className="px-4 py-2 text-right">Rs. {Math.round(method.revenue || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-right">Count</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.payment_status.map((status, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 capitalize">{status.payment_status?.replace('_', ' ') || 'N/A'}</td>
                  <td className="px-4 py-2 text-right">{status.count}</td>
                  <td className="px-4 py-2 text-right">Rs. {Math.round(status.revenue || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
