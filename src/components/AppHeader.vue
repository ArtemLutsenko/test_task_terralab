<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="container">
      <h2>Test task</h2>

      <ul class="header__menu">
        <li>
          <router-link to="/users">Users</router-link>
        </li>
        <li>
          <router-link to="/chart">Chart</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dedede;

  &__menu {
    display: flex;
    gap: 20px;

    li {
      list-style: none;
      font-size: 20px;
      text-decoration: none;
    }

    a {
      text-decoration: none;
      color: #dedede;
    }

    .router-link-active {
      font-weight: bold;
      border-bottom: 1px solid #dedede;
    }
  }
}
</style>
