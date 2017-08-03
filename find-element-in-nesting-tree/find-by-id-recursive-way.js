// Data
const allTunnels = [
	{
		id: 1,
		diamond: false,
		parent_id: 0,
		tunnels: [
			{
				id: 2,
				diamond: true,
				parent_id: 1,
				tunnels: [
					{
						id: 3,
						diamond: false,
						parent_id: 2,
						tunnels: [
							{
								id: 4,
								diamond: false,
								parent_id: 3,
								tunnels: [
									{ id: 5, diamond: false, parent_id: 4 },
									{ id: 6, diamond: true, parent_id: 4 },
									{ id: 7, diamond: false, parent_id: 4 }
								]
							},
							{
								id: 8, diamond: false, parent_id: 3
							},
							{
								id: 9,
								diamond: false,
								parent_id: 3,
								tunnels: [
									{ id: 10, diamond: false, lvl: 4, parent_id: 9 }
								]
							}
						]
					},
					{
						id: 11, diamond: false, parent_id: 2
					}
				]
			},
			{
				id: 12,
				diamond: true,
				parent_id: 1,
				tunnels: [
					{
						id: 13, diamond: false, parent_id: 12
					}
				]
			},
			{
				id: 14,
				diamond: false,
				parent_id: 1
			}
		]
	},
	{
		id: 15,
		diamond: false,
		parent_id: 0,
		tunnels: [
			{
				id: 16,
				diamond: false,
				parent_id: 15
			},
			{
				id: 17,
				diamond: false,
				parent_id: 15
			},
			{
				id: 18,
				diamond: false,
				parent_id: 15
			},
			{
				id: 19,
				diamond: false,
				parent_id: 15
			},
			{
				id: 20,
				diamond: false,
				parent_id: 15
			},
			{
				id: 21,
				diamond: false,
				parent_id: 15
			},
			{
				id: 22,
				diamond: false,
				parent_id: 15
			},
			{
				id: 23,
				diamond: false,
				parent_id: 15
			},
			{
				id: 24,
				diamond: false,
				parent_id: 15,
				diamonds: [
					{
						id: 25,
						diamond: false,
						parent_id: 24,
						diamonds: [
							{
								id: 26,
								diamond: false,
								parent_id: 25,
								diamonds: [
									{
										id: 27,
										diamond: false,
										parent_id: 26,
										diamonds: [
											{
												id: 28,
												diamond: false,
												parent_id: 27
											},
											{
												id: 29,
												diamond: false,
												parent_id: 27
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	}
]

// Realization
const findTunnelById = (initTunnel, id) => {
	const parentTunnels = []
	// Actions
	const goDown = (p) => {
		p[p.length] = 0
		return p
	}
	
	const goBack = (p) => p.slice(0, p.length-1)
	
	const goToNext = (p) => {
		p[p.length-1]+=1
		return p
	}
	
	// Conditions
	const isExactTunnel = (tunnel, currId) => tunnel['id'] === currId
	const hasTunnels    = (tunnel) => tunnel['tunnels']
	const isTunnelExist = (parTunnel, position) => parTunnel['tunnels'][position[position.length-1]]
	
	// Function
	const findTunnel = (currTunnel, currId, position) => {
		if (isExactTunnel(currTunnel, currId)) return currTunnel
		
		position = goDown(position)
		
		if (hasTunnels(currTunnel) && isTunnelExist(currTunnel, position)) {
			parentTunnels.unshift(currTunnel['tunnels'][position[position.length-1]])
			
			return findTunnel(
				currTunnel['tunnels'][position[position.length-1]],
				currId,
				position
			)
		}
		
		parentTunnels.shift()
		
		const findParentsNextTunnel = (tunnel, p) => {
			const parentTunnel = findTunnel(initTunnel, tunnel['parent_id'], [0])
			
			p = goBack(p)
			p = goToNext(p)
			
			if (isTunnelExist(parentTunnel, p))
				return findTunnel(parentTunnel['tunnels'][p[p.length-1]], currId, p)
			
			return findParentsNextTunnel(parentTunnel, p)
		}
		
		parentTunnels.shift()
		
		return findParentsNextTunnel(currTunnel, position)
	}
	
	return findTunnel(initTunnel, id, [0])
	
}

// Find tunnel bellow
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 15))