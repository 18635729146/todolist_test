describe('add todo', function () {
    let page;
    var count_global = 1;
    
    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })
    it('should new todo correct', async function() {
      //点击输入框 #选择器
      await page.click('#new-todo', {delay: 500});
      
      //输入内容，
      await page.type('#new-todo', 'new todo item', {delay: 50});
      
      //点击 enter
      await page.keyboard.press("Enter");
      
       //断言
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 


  it('should complete seccessfully', async function(){
    //TODO const todo_count = #todo-count > strong 获取其值 
    const _before = await page.$eval('#todo-count > strong',el => el.value);
    await page.click('#todo-list > li:nth-child(1) > div > input',{delay:50});//#todolist li:nth-child(1) 
    const _after = await page.$eval('#todo-count > strong',el => el.value);
    expect(_before).to.eql(_after);
  })

  //测试todolist中item的数量
  it('shoule get correct list',async function(){
    const c_list_length = await page.$$eval('#main ul li',e=>{
      var dd = e.length;
      return dd;
    });
    // console.log(c_list_length);
    expect(c_list_length).to.eql(count_global + 1);
  })
});