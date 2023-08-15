

export default function Table({ users, delData, load, editData }: any) {


	return (
		<article>
			{load ? (<h2 aria-busy={load}>Updating Users...</h2>) : (<h2 >Users Table</h2>)}
			<table>
				<thead>
					<tr>
						<th><strong>Name</strong></th>
						<th><strong>Age</strong></th>
						<th><strong>Edit</strong></th>
						<th><strong>Delete</strong></th>
					</tr>
				</thead>
				<tbody>
				{users?.map((user: any) => (
					<tr key={user.id}>
						<td>{user.name}</td>
						<td>{user.age}</td>
						<td><button className="btn" onClick={() => editData(user.id)}>edit</button></td>
						<td><button className="btn" onClick={() => delData(user.id)}>delete</button></td>
					</tr>
				))}
				</tbody>
			</table>
		</article>

	)
}
