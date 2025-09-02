import { db } from '@/src'

export async function seedTip() {
  await db.tip.createMany([{
    content: '幽默是一种对人生困境的转念选择--做反转。 至少...(还有什么是好的)， 还好...(没有发生更糟糕的事)，很好啊...(找到事件的好处)，不是...而是（抽的不是烟，而是寂寞）',
  }])
}
