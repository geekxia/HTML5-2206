export default () => {

  let a: string = 'hello'
  let b: number = 100
  let c: boolean = true

  let d: number[] = [1,2,3,4]
  let e: Array<string> = ['a', 'b']

  let f: number[][] = [[1,2], [2,3]]
  let g: Array<Array<number>> = [[2], [3]]

  let h: any = []

  const foo = (a: number, b: string) => {
    return null
  }
  foo(100, 'str')

  // 自定义类型，首字母大写
  interface I {
    a: string,  // 必有属性
    b: number,
    name?: string,   // 可选属性
    age?: number,
    readonly addr?: string,  // 只读属性
    [key: string]: any,  // 扩展
    onChange?: (a: number, b?:number) => number | string
  }

  const i: I = {
    a: 'hehe',
    b: 200,
    age: 10,
    addr: '广东深圳',
    mobile: 110,
    onChange: (a, b=0) => (a + b + '')
  }
  i.age = 20

  if (typeof i.onChange === 'function') {
    i.onChange(100)
  }
  if (i.onChange) {
    i.onChange(200)
  }
  
  // 类型联合
  type A = number | string | boolean
  const a1: A  = true

  interface B1 {
    name: string
  }
  interface B2 {
    age: number
  }

  // 类型交叉
  type B = B1 & B2 & { addr?: string }
  const b1: B = {
    name: 'hello',
    age: 200
  }

  type C = 'big' | 'small'
  const c1: C = 'small'

  // 字面量类型
  const j: 'qf' = 'qf'
  const k: 'qf' | 'sz' = 'sz'

  const l: null = null
  const m: undefined = undefined

  // 枚举类型
  enum Cate  {
    office = '办公用品',
    car = '汽车生活',
    clothe = '男装女装'
  }
  console.log(Cate.office)

  const cate = 'car'
  console.log(Cate[cate])

  // 元组：长度固定并且每个位置的数据类型也固定的数组。
  type T = [string, number, boolean]
  const n: T = ['aa', 20, true]

  // 泛型：当我们定义函数或接口时不指定具体类型，当接口或函数被使用时再给出具体的类型。

  function doSome<T, U> (arg: T, foo: U): void {
    console.log(arg)
  }

  doSome<number, any>(100, true)
  doSome<string, string>('hello', 'world')

  interface Man<T,U> {
    name: T,
    age: U
  }
  const m1: Man<string, number> = {
    name: 'zhangsan',
    age: 100
  }

  function sub<T> (a: T, b: T) : void {
    
  }
  sub<number>(1, 2)

  return null
}