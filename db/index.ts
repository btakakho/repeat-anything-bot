const collections: any = []
const cards: any = [
  {
    id: 555222,
    front: 'abcd',
    back: 'bdsd',
  },
]

class Database {
  addCard(card: any) {
    cards.push(card)
  }

  get cards() {
    return cards
  }

  get collections() {
    return collections
  }
}

const db = new Database()

export { db }
