const findItemById = (initItems, id, items) => {
	const parentItems = []
	
	// Actions
	const goDown   = (p) => p.concat(0)
	const goBack   = (p) => p.slice(0, p.length-1)
	const goToNext = (p) => p.map((item, i) => i === p.length-1 ? item+1 : item)
	
	// Condition
	const isExactItem     = (item, currId) => item['id'] === currId
	const hasSubItems     = (item)         => item[items]
	const isSubItemExist  = (parItem, p)   => parItem[items][goDown(p)[p.length]]
	const hasNextSubItem  = (parItem, p)   => parItem[items][goToNext(p)[p.length-1]]
	const areParentsExist = ()             => parentItems.length > 0
	const hasNextItem     = (p)            => initItems[goToNext(p)[p.length-1]]
	const isItemExist     = (items, p)     => items[goToNext(goBack(p))[p.length-2]]
	
	// Main logic
	const find = (currItems, currId, position) => {
		const currItem = currItems[position[position.length-1]]
		
		if (isExactItem(currItem, currId)) return currItem
		
		if (hasSubItems(currItem) && isSubItemExist(currItem, position)) {
			parentItems.unshift(currItem)
			
			return find(currItem[items], currId, goDown(position))
		}
		
		if (areParentsExist() && hasNextSubItem(parentItems[0], position))
			return find(parentItems[0][items], currId, goToNext(position))
		
		if (areParentsExist()) {
			const goToNextParentsItem = (p) => {
				parentItems.splice(0, 1)
				
				if(!areParentsExist() && isItemExist(initItems, p))
					return find(initItems, currId, goToNext(goBack(p)))
				
				if (areParentsExist()) {
					if (isItemExist(parentItems[0][items], p))
						return find(parentItems[0][items], currId, goToNext(goBack(p)))
					
					return goToNextParentsItem(goToNext(goBack(p)))
				}
				
				return -1
			}
			
			return goToNextParentsItem(position)
		}
		
		if (hasNextItem(position))
			return find(initItems, currId, goToNext(position))
	}
	
	return find(initItems, id, [0])
}

const initCategories = [
	{
		id: 1,
		categories: [
			{ id: 3,
				categories: [
					{
						id: 5,
						categories: [{ id: 6 }]
					}
				]
			},
			{ id: 4 },
			{ id: 7 },
			{ id: 8, categories: [{ id: 9 }] },
			{ id: 10 }
		]
	},
	{
		id: 2
	},
	{
		id: 3,
		categories: [
			{
				id: 99,
				categories: [ { id: 100 } ]
			}
		]
	}
]

console.log(findItemById(initCategories, 101, 'categories'))