#!/usr/bin/env node

/**
 * 抽奖功能演示脚本
 * 展示抽奖算法的效果
 */

// 模拟抽奖任务数据
const taskCategories = {
  '时尚与生活': [
    '发布穿搭、旅行照片，分享你对时尚趋势的见解。',
    '记录日常生活中的有趣瞬间，保持真实和亲和力。',
    '分享日常生活中的小趣事，配上幽默的文字和表情包。',
  ],
  '学习与成长': [
    '分享你正在学习的新知识或技能，记录学习过程。',
    '参加讲座或研讨会，并分享照片和感想。',
    '分享你最近完成的项目或任务，展示成果。',
  ],
  '内容创作': [
    '撰写深度文章，分享个人见解和生活体验。',
    '分享与你专业领域相关的见解或分析。',
    '制作简短的视频教程，教大家一个小技能。',
  ],
  '公益与正能量': [
    '发布参与公益活动的照片或视频，激励他人。',
    '分享一件让你开心的小事，传递正能量。',
    '分享你最近的一次志愿者经历。',
  ],
  '健康与运动': [
    '发布运动打卡照片或视频，分享健身心得。',
    '分享健康食谱或饮食习惯，附上简单的做法。',
    '分享生活小技巧或创意点子。',
  ],
};

/**
 * 随机选择数组中的一项
 */
function randomSelect(items) {
  if (items.length === 0) {
    throw new Error('数组不能为空');
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

/**
 * 随机选择数组中的多项（不重复）
 */
function randomSelectMultiple(items, count) {
  if (items.length === 0) {
    throw new Error('数组不能为空');
  }

  if (count > items.length) {
    count = items.length;
  }

  if (count < 0) {
    count = 0;
  }

  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * 演示抽奖功能
 */
function demoRaffle() {
  console.log('🎯 抽奖功能演示\n');

  // 演示1: 随机抽奖
  console.log('📌 演示1: 随机抽奖');
  const allTasks = Object.values(taskCategories).flat();
  console.log(`总任务数: ${allTasks.length}`);

  for (let i = 1; i <= 5; i++) {
    const task = randomSelect(allTasks);
    console.log(`${i}. ${task}`);
  }

  console.log('\n📌 演示2: 分类抽奖');
  Object.keys(taskCategories).forEach(category => {
    const tasks = taskCategories[category];
    const selectedTask = randomSelect(tasks);
    console.log(`${category}: ${selectedTask}`);
  });

  console.log('\n📌 演示3: 推荐任务');
  const recommendedTasks = randomSelectMultiple(allTasks, 6);
  recommendedTasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });

  console.log('\n📌 演示4: 任务统计');
  console.log(`分类数量: ${Object.keys(taskCategories).length}`);
  console.log(`总任务数: ${allTasks.length}`);
  console.log(`平均每类任务数: ${(allTasks.length / Object.keys(taskCategories).length).toFixed(1)}`);

  console.log('\n🎉 演示完成！');
  console.log('💡 提示: 在浏览器中访问 http://localhost:10003 查看完整的抽奖界面');
}

// 运行演示
if (require.main === module) {
  demoRaffle();
}

module.exports = {
  randomSelect,
  randomSelectMultiple,
  taskCategories,
  demoRaffle
};
