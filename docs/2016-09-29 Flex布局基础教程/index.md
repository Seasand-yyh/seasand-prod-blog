# Flex布局基础教程

---

~~~html
<div class="father">
	<div class="child">1</div>
	<div class="child">2</div>
	<div class="child">3</div>
</div>
~~~

~~~css
.father {
    border: 1px solid blue;
}

.child {
    width: 100px;
    height: 100px;
    background-color: yellow;
    border: 1px solid red;
}
~~~

1、display: flex;

~~~css
.father {
    border: 1px solid blue;
    display: flex;
}
~~~

2、flex-direction: [column | column-reverse | row | row-reverse]

~~~css
.father {
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
}
~~~

3、居中

~~~css
.father {
    border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-item: center;
}
~~~

4、换行

~~~css
.father {
    border: 1px solid blue;
    display: flex;
    flex-wrap: wrap;
}
~~~



<br/><br/><br/>

---

