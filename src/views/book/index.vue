<template>
  <div>
    <div class="header">
      <h1>WILEY</h1>
    </div>
    <div class="page-wrap">
      <h1>Paperback Nonfiction Bestsellers</h1>
      Sort by:
      <el-select v-model="sort" style="width: 120px" class="filter-item">
        <el-option
          v-for="item in sortOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
     <el-input class="input" v-model="searchParam" :placeholder="sort"></el-input>
     <el-button type="primary" @click="search">search</el-button>
      <li v-for="(item, i) in bookList" class="wrap" :key="i">
        <div class="rank">{{ i+1 }}.</div>
        <img :src="item.book_image" class="pic" />
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div>by {{ item.author }}</div>
          <div class="des">{{ item.description }}</div>
          <div>ISBN: {{ item.primary_isbn13 }}</div>
        </div>
      </li>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getLatestBooks, reviewByFilterType } from '@/api/book'

@Component({
  name: 'Books',
  components: {}
})
export default class extends Vue {
  private sortOptions = ['Rank', 'Title', 'Author', 'ISBN'];
  private sort = 'Rank';
  private searchParam = '';
  private bookList : Array<any> = [];

  mounted() {
    this.getLatestBooks()
  }

  private search() {
    this.reviewByFilterType(this.sort, this.searchParam)
  }

  private convertBookList(booksList:any) {
    // eslint-disable-next-line camelcase
    const temp : Array<any> = []
    booksList.forEach((item:any) => {
      temp.push({ auth: item.book_author, title: item.book_title, description: item.summary, primary_isbn13: item.isbn13[0] })
    })
    return temp
  }

  private async getLatestBooks() {
    try {
      const {
        data: {
          results: { books }
        }
      } = await getLatestBooks()
      this.bookList = books
    //   this.bookList = books.filter((item: any, i: any) => {
    //     return i < 5
    //   })
    } catch (error) {
      this.$message.error('error')
    }
  }

  private async reviewByFilterType(type: String, payload: String) {
    try {
      const { data: { results } } = await reviewByFilterType(type.toLowerCase(), payload)
      this.bookList = this.convertBookList(results)
    } catch (error) {
      this.$message.error('error')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #000;
  padding-left: 20px;
}
.page-wrap {
  padding: 30px 100px;
  .input{
      width: 200px;
      display: inline-block;
      margin: 0 20px;
  }
  .wrap {
    display: flex;
    margin: 40px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    .rank {
      width: 40px;
      padding-top: 30px;
      font-size: 18px;
      font-weight: 800;
    }
    .pic {
      width: 128px;
      height: 168px;
      margin-right: 30px;
    }
    .text {
      width: 600px;
      padding-top: 30px;
      word-break: break-all;
      overflow: hidden;
      .title {
        font-size: 18px;
        font-weight: 800;
      }
      .des {
        margin: 15px 0;
      }
    }
  }
}
</style>
