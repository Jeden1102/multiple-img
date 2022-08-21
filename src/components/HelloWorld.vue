<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  <input class="hide" ref="images" id="images" @change="setFiles" type="file" multiple >
  <input class="hide" ref="imagesChange" id="imagesChange" @change="imagesChange" type="file" multiple >
  <div class="img-container">
    <label for="images" class="img-box">
      <img class="img"  src="../assets/add.png" alt="">
    </label>
    <div class="img-box">
      <img class="img" src="../assets/dog.svg" alt="">
    </div>
  </div>
  <div v-if="filePreviewUrls.length > 0" id="preview">
    <div class="img-container" :id="`img-container-${idx}`"  v-for="(url,idx) in filePreviewUrls" :key="url">
      <label @click="setIdxLabel(idx)" for="imagesChange" class="img-box">
        <img class="img" src="../assets/replace.png" alt="">
      </label>
      <div class="img-box">
        <img class="img"  :src="url" alt="">
      </div>
      <div @click="removeFile(idx)" class="img-box">
        <img class="img" src="../assets/image.png" alt="">
      </div>
    </div>
  </div>
  <button @click="sendData">Send</button>
  <label class="typo__label">Single select / dropdown</label>
  <multiselect @search-change="testMethod" v-if="cities.length>0" v-model="value" deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select one" :maxElements="5" :options="cities" :searchable="true" :allow-empty="false" >
    <template :limit="3" slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong></template>
  </multiselect>
  <pre class="language-json"><code>{{ value  }}</code></pre>
  <div class="alert-box">
{{ errorMsg }}
  </div>
  </div>
</template>

<script>
import axios from 'axios'
 import Multiselect from 'vue-multiselect'
export default {
  name: 'HelloWorld',
  components:{
    Multiselect 
  },
  data() {
    return {
      files:null,
      filePreviewUrls : [],
      imgArray : [],
      errorMsg : '',
      idxChange:null,
      value : null,
      cities:null,
    }
  },
  props: {
    msg: String
  },
  mounted() {
    axios.get("https://countriesnow.space/api/v0.1/countries/iso").then(res=>{
      console.log(res.data)
      this.cities = res.data.data
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    testMethod(searchQuery, id){
          axios.get("https://countriesnow.space/api/v0.1daw/countries/iso").then(res=>{
      console.log(res.data)
      this.cities = res.data.data
    }).catch(err=>{
      // this.cities = []
      console.log(err)
    })
      console.log(searchQuery)
    },
    setFiles(ev){
      this.files = this.$refs.images.files;
      let arr = [];
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
      this.imgArray.push(this.$refs.images.files[i]);
      }
      console.log(this.imgArray)
      if(this.imgArray.length > 7){
        this.imgArray = this.imgArray.splice(0,7);
        this.errorMsg = "Zbyt dużo zdjęć, max. 7 zostało dogranych"
      }
      this.setUrls();
    },
    setUrls(){
      this.filePreviewUrls = []
      for (var i = 0; i < this.imgArray.length; i++) {
          let file = this.imgArray[i];
          let  src = (window.URL || window.webkitURL).createObjectURL(file);
          this.filePreviewUrls.push(src)
      }
    },
    removeFile(idx,ev){
      this.imgArray.splice(idx,1)
      this.setUrls();
    },
    setIdxLabel(idx){

      this.idxChange = idx;
    },
    imagesChange(){
      console.log(this.imgArray)
      if(this.$refs.imagesChange.files[0]){
      let file  = this.$refs.imagesChange.files[0]
      this.imgArray[this.idxChange] = file;
      this.setUrls()
      }

    },
    sendData(){
      console.log(this.imgArray)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hide{
  display:none;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.remove-item{
  animation:remove-item 1s;
}
.img-container{
  display:flex;
  margin:8px 0;
  gap:10px;
  transition:.3s;
  .img-box{
    display:flex;
    width:50px;
    height:50px;
    justify-content: center;
    align-items: center;
    background-color: rgb(228, 228, 228);
    border-radius: 5px;
    .img{
      max-width:40px;
      max-height:40px;
    }
  }
}
@keyframes remove-item {
  0%{
    transform: translate(0);
  }
  10%{
    transform: translate(20px,0);
  }
  100%{
    transform: translate(-1000px,0);
    opacity: 0;
  }
}
</style>
