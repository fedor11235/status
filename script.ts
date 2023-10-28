
// типы
type Three = {
  id: number | string,
  parent: number | 'root'
  type?: null | 'test'
}

// входные данные
const items: Three[] = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

// класс
class TreeStore {
  private readonly three: Three[];
  private threeTemp: Three[];

  constructor(three: Three[]) {
    this.three = three;
    this.threeTemp = [];
  }

  getAll(): Three[] {
    return this.three.sort((a, b) => Number(a.id) - Number(b.id))
  }

  getItem(id: number | string): Three | undefined {
    return this.three.find(elem => elem.id === id)
  }

  getChildren(id: number | string): Three[] {
    const threeParent = this.three.find(elem => elem.id === id)
    if(threeParent) {
      return this.three.filter(elem => elem.parent === threeParent.id)
    }
    return []
  }

  getAllChildren(id: number | string): Three[]{
    const threeParent = this.three.find(elem => elem.id === id)
    if(threeParent) {
      for (const threeChildren of this.three) {
        if(threeChildren.parent === threeParent.id) {
          this.threeTemp.push(threeChildren)
          this.getAllChildren(threeChildren.id)
        }
      }
      return this.threeTemp
    }
    return this.threeTemp
  }

  getAllParents(id: number): Three[] {
    const threeParent = this.three.find(elem => elem.id === id)
    if(threeParent) {
      return this.three.filter(elem => elem.id === threeParent.parent)
    }
    return []
  }
}

// проверка вывода
const treeStore = new TreeStore(items)

const threeAll = treeStore.getAll()
const children = treeStore.getChildren(1)
const allChildren = treeStore.getAllChildren(1)

console.log(threeAll)
console.log(children)
console.log(allChildren)

// какой-то тяп ляп пример тестирования
function testInput() {
  const treeStore = new TreeStore(items)
  const caseOne = treeStore.getAll()
  const caseTwo = treeStore.getChildren('cscscssc')
  const caseThreeChildren = treeStore.getChildren(1)
  const caseThreeAllChildren = treeStore.getAllChildren(1)

  if (caseOne.length === 0) {
    throw new Error('Функция работает неверно! В конструкторе мы отправили не пустой массив дерева!!');
  }
  if (caseTwo.length > 0) {
    throw new Error('Функция работает неверно! Мы отправили не существующий индекс, должен вывести пустой массив!!');
  }
  if (caseThreeAllChildren.length <= caseThreeChildren.length) {
    throw new Error(
      'Функция работает неверно!' +
      'В конструктор мы отправили дерево с несколькими уровнями дочерних элементов' +
      'глубокое хождение по дочерним элементам выведит длину массива больше чем не глубокое!!'
    );
  }
}

testInput()