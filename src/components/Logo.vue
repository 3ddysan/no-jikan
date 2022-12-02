<template>
  <div class="logo">
    <h1 class="title">no<span>-</span>jikan</h1>
  </div>
</template>
<style scoped>
.logo {
  margin: 1em;
}
.title {
  width: 70px;
  background-color: lightcoral;
  padding-left: 2px;
  box-shadow: 0px 0px 1px 5px hwb(0 0% 100%);
  font-weight: bold;
}

.title span {
  background-color: white;
}

.title:hover {
  cursor: pointer;
  transform: rotate(8deg);
  transition: all 0.3s ease-in-out 0s;
}
</style>
