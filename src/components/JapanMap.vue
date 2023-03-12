<template>
  <div class="all">
    <h1>エリアを選んでね！</h1>

    <div class="Japan">
      <img src="../assets/Japan.png" />
      <div class="box-1"></div>
      <div class="box-2"></div>
      <div class="box-3"></div>
      <div class="box-4"></div>
      <div class="box-5"></div>
      <div class="box-6"></div>
      <div class="box-7"></div>
      <div class="box-8"></div>
      <div class="box-9"></div>
    </div>
  </div>
</template>
<style>
.all {
  margin-top: 40px;
  width: 100vw;
  position: relative;
}
img {
  width: 570px;
  height: 700px;
}
.Japan {
  position: absolute;
  left: 33%;
  top: 5%;
}

.box-1 {
  width: 190px;
  height: 180px;
  border-radius: 50%;
  background-color: rgba(226, 16, 16, 0.417);
  position: absolute;
  left: 23em;
  top: 0.5em;
}

.box-2 {
  width: 80px;
  height: 190px;
  background-color: rgba(16, 65, 226, 0.41);
  border-radius: 50%;
  position: absolute;
  left: 23.5em;
  top: 13em;
}
.box-3 {
  width: 75px;
  height: 75px;
  background-color: rgba(226, 100, 16, 0.442);
  border-radius: 50%;
  position: absolute;
  left: 23em;
  top: 25em;
}
.box-4 {
  width: 120px;
  height: 120px;
  background-color: rgba(100, 16, 226, 0.412);
  border-radius: 50%;
  position: absolute;
  left: 16em;
  top: 25em;
}
.box-5 {
  width: 100px;
  height: 100px;
  background-color: rgba(16, 226, 152, 0.65);
  border-radius: 60%;
  position: absolute;
  left: 12em;
  top: 30em;
}
.box-6 {
  width: 150px;
  height: 50px;
  background-color: rgba(131, 226, 16, 0.406);
  transform: rotate(-27deg);
  border-radius: 50%;
  position: absolute;
  left: 3.2em;
  top: 31.5em;
}
.box-7 {
  width: 110px;
  height: 42px;
  background-color: rgba(226, 16, 58, 0.528);
  transform: rotate(-27deg);
  border-radius: 50%;
  position: absolute;
  left: 6.3em;
  top: 35em;
}
.box-8 {
  width: 90px;
  height: 130px;
  background-color: rgba(255, 0, 221, 0.399);
  border-radius: 50%;
  position: absolute;
  left: 0.4em;
  top: 36em;
}
.box-9 {
  width: 110px;
  height: 110px;
  background-color: rgba(249, 164, 6, 0.399);
  border-radius: 50%;
  position: absolute;
  left: 29em;
  top: 36em;
}
/* @media screen and (max-width: 1200px) {
  .box-1 {
      {top: 20em;}
  }
} */
</style>
