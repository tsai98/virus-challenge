let lastAddTime = 0;          //定义记录上次增加障碍物的时间的变量，并且设置初值为0
let pipes=[];              //定义一个类的数组，用来存储多个障碍物的类
let evolves=[];
let imgvirus;
let imgevolve;
let imgsl;
let imgxl;
let score=0;
let flag=0;//判断是否碰撞
let infect=1;
function preload(){//预加载图片
  imgvirus=loadImage("virus.png");
  imgevolve=loadImage("evolve.png");
  imgsl=loadImage("shanglian.png");
  imgxl=loadImage("xialian.png");

}
function setup(){
  createCanvas(windowWidth,windowHeight);
  s = new Virus();
  pipe = new Pipe();      //定义一个名为pipe的对象，这个对象是属于障碍物类（pipe类）
  evolve = new Evolve();
} 
function draw(){
  if (gameScreen == 0) {         //如果当前是游戏准备开始界面状态
    initScreen();                //调用游戏准备方法，进入游戏准备界面
  } else if (gameScreen == 1) {  //如果当前是游戏界面状态
    gamePlayScreen();            //调用开始游戏方法，进入游戏界面
  } else if (gameScreen == 2) {  //如果当前是游戏结束界面状态
    gameOverScreen();            //调用游戏结束方法，进入游戏结束界面
  } 
}

class Virus{
  constructor (){
  this.x = width/2;
  this.y = height/2;
  this.speed =10;
  this.vy=0;               //定义类的垂直方向的速度，并设置它的初始值为0
  this.gravity =1;        //定义类的重力参数，并设置它的初始值为1
  this.len=2;
  this.tail=[];
  }
  move(){

   // this.x += this.speed;
    this.y += this.vy;                            //使有竖直方向的位移，移动的初速度是起跳初速度
    this.vy = this.vy+this.gravity;                      //使Ecgline的垂直速度加上重力加速度
    this.y= constrain(this.y, 0, height/2+300);       //使Ecgline在竖直方向上，不会超出屏幕的范围
    this.tail.unshift(createVector(this.x, this.y));
    this.tail = this.tail.splice(0, this.len);
    for (let i = 1; i < this.tail.length; i++) {
      this.tail[i].x -= this.speed;
  //    const t= this.tail[i];
    }
    if (this.x > width) {
      this.x = 0;
    }
  }
  jump(){                     //定义Ecgline类的跳跃方法
   // if(this.y==height/2){    //只有Ecgline在地面上，才能够跳跃。否则的话，在半空中也能跳跃了
      this.vy= -10;              //使Ecgline有垂直向上的起跳初速度
   //  }
    }
  show(){
    //this.tail.forEach((t) => rect(t.x, t.y, 10, 10));
    for(let i= 1; i<this.tail.length;i++){
      // noStroke();
      // fill(random(255),random(255),random(255),100-i/10);
      // rect(this.tail[i].x,this.tail[i].y,10,10);
      image(imgvirus, this.tail[i].x,this.tail[i]. y,20,20);
    }
  }
  hits1(pipes){               //定义病毒类的碰撞检测方法
    //  for(let t of this.tail){
              return collideRectRect(this.x, this.y, 20,20, pipes.x+10,height-pipes.bottom+10,pipes.wx-10, pipes.bottom); //返回两个矩形是否碰撞的检测结果的逻辑值，发生碰撞为真，未发生碰撞为假
     // }
      }
  hits2(pipes){               //定义病毒类的碰撞检测方法
     // for(let t of this.tail){
              return collideRectRect(this.x, this.y, 20,20, pipes.x+10,-10,pipes.ws-10,pipes.top); //返回两个矩形是否碰撞的检测结果的逻辑值，发生碰撞为真，未发生碰撞为假
     // }
      }
  hits3(evolves){               //定义病毒类的碰撞检测方法
      //for(let t of this.tail){
              return collideRectRect(this.x, this.y, 20,20, evolves.x,evolves.y,40,40); //返回两个矩形是否碰撞的检测结果的逻辑值，发生碰撞为真，未发生碰撞为假
     // }
      }
  addScore(pipes){                                              //定义病毒类的得分方法
      if((pipes.x+pipes.wx<this.x)&&(pipes.score==0)&&(flag==0)){ //如果某个障碍物的右侧部分在病毒的左边，并且病毒之前没有经过这个障碍物
         pipes.score=1;                                          //使这个障碍物的分数为1，表示病毒已经经过了这个障碍物，就不再继续得分
         score+=1*infect;                                                  //得分加一
      }
   }
  addInfect(evolves){ 
    if(evolves.score==0){
     infect+=1;
     evolves.score=1;
     this.len+=2;
    }
  }
}
class Pipe{                  //定义一个名为pipe的类，这个类定义了障碍物的一些属性和方法
  constructor(){            //构造函数，通过它可以定义和设置类的一些属性
    let intervalHeight = random(100,250);
    this.top=random(150,height/2)               //定义类的宽，并设置它的初始值为50
    this.bottom=height-this.top-intervalHeight;              //定义类的高，并设置它的初始值为90
    this.x= width;          //定义类的横坐标，并设置它的初始值为画布的宽度
    this.imgsl=imgsl;
    this.imgxl=imgxl;
    this.ws=this.imgsl.width; //定义类的纵坐标，并设置它的初始值，使它的底部与画布的底部对
    this.wx=this.imgxl.width;
    this.score =0;//记录病毒是否经过障碍
  }
move(){                              //定义障碍物类的移动方法
this.x -=10;                         //使障碍物有水平方向的位移，始终以固定的速度向左移动

}
show(){                  
// stroke(1);         
// fill(255);   //定义障碍物类的显示方法
// rect(this.x,0,this.w,this.top);
// print(this.top);
// rect(this.x,height-this.bottom,this.w,this.bottom);  //先用长方形来代替障碍物
image(this.imgsl,this.x,0,this.ws,this.top);
image(this.imgxl,this.x,height-this.bottom,this.wx,this.bottom);
}
}
class Evolve{                  //定义一个名为净化点数的类
    constructor(){            
      this.x = width;          //定义类的横坐标，并设置它的初始值为画布的宽度
      this.y = random(30,height/2);  //定义类的纵坐标，使它随机出现在图像上
      this.alpha = 255;
      this.score = 0;
      this.flag=0; //是否绘画的标识
    }
  move(){                              //定义进化点数类的移动方法
  this.x -=10;                         //使进化点数水平方向的位移，始终以固定的速度向左移动
  
  }
  show(){                              //定义进化点数类的显示方法
  //tint(255,this.alpha); 
  image(imgevolve, this.x,this.y,40,40);
  }
  hiden(){
     this.flag=0;
  }
  }

function printScore() {           //打印得分方法
    textAlign(LEFT);                //设置文本对齐方式为左对齐
    fill(50);                       //设置文本颜色为黑色
    textSize(30);                   //设置字体大小
    text("感染人数: "+score, 5*width/6 , height/20 ); //输出得分，设置文本的位置
} 
function gameOver(){
  background(255 );
  textAlign(CENTER);        //设置文字的对齐方式为居中对齐  
  textSize(70);             //设置文字的大小为70
  text("游戏结束",width/2, height/2-40);//在屏幕中央输出文字“game over”
  text("最终感染人数: "+score, width/2, height/2+40 ); //输出得分，设置文本的位置
  noLoop();                           //设置为不再循环，也就是停止在画布上绘制，画面静止
}
function printInfect() {           //打印得分方法
  textAlign(LEFT);                //设置文本对齐方式为左对齐
  fill(50);                       //设置文本颜色为黑色
  textSize(30);                   //设置字体大小
  text("感染能力: "+infect,20, height/20); //输出得分，设置文本的位置
} 