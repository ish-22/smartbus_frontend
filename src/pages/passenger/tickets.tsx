import PassengerLayout from '@/layouts/MainLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleGuard from '@/components/auth/RoleGuard';

export default function PassengerTickets() {
	// Sample ticket data
	const tickets = [
		{ id: 'TCKT001', bus: '1234', date: '2025-09-28', seats: 2, status: 'Confirmed' },
		{ id: 'TCKT002', bus: '5678', date: '2025-09-30', seats: 1, status: 'Pending' },
	];
	return (
		<AuthGuard>
			<RoleGuard roles={['PASSENGER']}>
				<PassengerLayout title="My Tickets">
					<div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
						<h2 className="text-xl font-bold mb-4 text-blue-700">My Tickets</h2>
						<table className="w-full text-left border">
							<thead>
								<tr className="bg-blue-50">
									<th className="px-2 py-2">Ticket ID</th>
									<th className="px-2 py-2">Bus</th>
									<th className="px-2 py-2">Date</th>
									<th className="px-2 py-2">Seats</th>
									<th className="px-2 py-2">Status</th>
								</tr>
							</thead>
							<tbody>
								{tickets.map(ticket => (
									<tr key={ticket.id} className="border-t">
										<td className="px-2 py-2">{ticket.id}</td>
										<td className="px-2 py-2">{ticket.bus}</td>
										<td className="px-2 py-2">{ticket.date}</td>
										<td className="px-2 py-2">{ticket.seats}</td>
										<td className="px-2 py-2">{ticket.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</PassengerLayout>
			</RoleGuard>
		</AuthGuard>
	);
}
