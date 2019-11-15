<template>
  <div>
    <!--    上传弹窗-->
    <transition name="el-fade-in-linear">
      <div class="up-dialog" v-if="isShowLoadBox">
        <div class="up-dialogBox bg-white padding-sm text-black">
          <!--        关闭按钮-->
          <div class="text-right">
            <i class="el-icon-close text-blod large " @click="closeDialog()"></i>
          </div>

          <!--        主体内容-->
          <!--          上传列表-->
          <div class="upLoadList flex flex-direction-reverse ">

            <div class="flex justify-center margin-top-sm">
              <div class="pointer el-button--small bg-cyan  margin-left-sm" @click="submitclick">点击上传
              </div>
              <el-button size="small" class="el-button--small bg-red margin-left-sm" @click="closeUpload">取消
              </el-button>
            </div>

            <el-upload
                class="upload-demo flex flex-direction-reverse up-file"
                ref="upload"
                action="baidu.com"
                accept='.xls,.xlsx,.csv'
                :show-file-list="true"
                :on-preview="handlePreview"
                :on-success="uploadFileSuccess"
                :on-remove="handleRemove"
                :auto-upload="false"
                multiple
                :limit="10"
                :on-exceed="handleExceed"
                :on-change="filechange"
                :file-list="fileList"
                :http-request="submitFile"
            >

              <div slot="tip" class="el-upload__tip margin-top-sm">点击选择文件即可上传</div>
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            </el-upload>

            <div class="text-center extra-large padding-xl" v-if="fileList.length<=0">空空如也，请先添加文件吧</div>

          </div>
        </div>
      </div>
    </transition>

    <!--    缩小上传弹窗-->
    <div class="uploadSmall bg-cyan "
         :class="uploadShow?'animate-small':''"
         @click="showUpload()">
      <div class="flex align-center justify-center" style="height: 100%">
        <span>{{uploadNum==fileList.length?'已完成':'上传中'}}</span>
      </div>
    </div>

    <el-dialog title="失败汇总" :visible.sync="dialogTableVisible" @close="close">
      <el-table :data="uploadError" border max-height="400">
        <el-table-column property="filename" label="文件名"></el-table-column>
        <el-table-column property="errcode" label="错误码" width="100"></el-table-column>
        <el-table-column property="errmsg" label="原因"></el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: "Upload",
    props: {
      showLoadBox: {
        type: Boolean,
        default: false
      }
    },
    data() {
      console.log(this.showLoadBox)
      return {
        fileList: [],
        uploadNum: 0,
        isShowLoadBox: this.showLoadBox,
        uploadShow: false,
        uploadError:[],
        dialogTableVisible:false
      }
    },
    methods: {

      // 关闭上传弹窗
      closeUpload() {
        this.$refs.upload.abort()//停止上传
        this.isShowLoadBox = false;
        this.fileList = [];
        this.uploadNum = 0;
        this.$emit('changeShowLoadBox', this.isShowLoadBox)//传递给父组件
      },
      // 缩小上传弹窗
      closeDialog() {
        if (this.fileList.length > 0) {
          if (this.uploadNum == this.fileList.length) {
            this.fileList = [];
            this.uploadNum = 0
          } else {
            this.uploadShow = true;
          }
        } else {
          this.fileList = [];
          this.uploadNum = 0
        }
        this.isShowLoadBox = false;
        this.$emit('changeShowLoadBox', this.isShowLoadBox)//传递给父组件
        // this.isuploading = true;

      },
      //放大上传弹窗
      showUpload() {
        this.uploadShow = false;
        this.isShowLoadBox = true;
      },

      // 上传文件状态监听
      filechange(files, fileList) {
        console.log(fileList)
        this.fileList = fileList
      },

      // 删除文件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      // 文件超出限制
      handleExceed(file, fileList) {
        this.$message('文件超出限制')
        console.log(file, fileList);
      },


      // 自定义上传资料
      submitFile(data) {

        let params = new FormData(); //创建form对象
        params.append('file', data.file);//通过append向form对象添加数据
        params.append('fileType', data.file.type);//通过append向form对象添加数据
        // params.append('fileSize', data.file.size);//通过append向form对象添加数据
        params.append('fileName', data.file.name);//添加form表单中其他数据
        params.append('platform', '天猫');//添加form表单中其他数据
        params.append('shop', '惠普儒韵官旗店');//添加form表单中其他数据
        params.append('user', 'admin');//添加form表单中其他数据
        let config = {
          headers: {'Content-Type': 'multipart/form-data'},
          onUploadProgress: progressEvent => {
            console.log(progressEvent, 'progressEvent')
            let percent = (progressEvent.loaded / progressEvent.total * 100) || 0
            //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
            data.onProgress({percent: percent})
          },
        };  //添加请求头
        this.$axios.post('/storage/flow/', params, config)//上传文件
          .then(response => {
            console.log(response.data)
            if (response.data.code == 0) {
              data.onSuccess(response.data)
              this.uploadNum++;
              // 判断是否全部上传完

            } else {
              let obj = {}
              obj.filename = data.file.name;
              obj.errcode = response.data.code;
              obj.errmsg = response.data.msg;
              this.uploadError.push(obj)
              data.onError()
              // this.uploadNum++;
              this.$message.error(`文件上传失败，错误码为：${response.data.code}`);
            }
            if (this.uploadNum == this.fileList.length) {
              // 判断是不是有上传成功的
              if(this.fileList.length>0){
                this.$message({
                  showClose: true,
                  message: '文件已上传完成',
                  type: 'success'
                });
              }
              setTimeout(()=>{
                if(this.uploadError.length>0){
                  this.dialogTableVisible = true
                }
              },400)
            }
          })
          .catch((err) => {

            data.onError()
            this.uploadNum++;
            if (this.uploadNum == this.fileList.length) {
              this.$message({
                showClose: true,
                message: '文件已上传完成',
                type: 'success'
              });
            }
          })
      },
      // 点击上传
      submitclick() {
        console.log(this.fileList)
        if (this.fileList.length <= 0) {
          this.$message({
            showClose: true,
            message: '请先选择需要上传的文件',
            type: 'warning'
          });
          return
        }

        this.$refs.upload.submit();
      },
      // 上传成功监听
      uploadFileSuccess(file, fileList) {// 这里可以打印file查看数据结构
        if (file.response) {//判断是否上传成功
          this.fileList.push({url: file.response.key, status: 'finished'})//上传成功之后把值添加到imglist中
        }
      },
      handleRemove(file, fileList) {// 这里可以打印filelist查看数据结构
        this.fileList = fileList//删除某项数据重新对filelist赋值
      },

      // 错误弹窗监听
      close(){
        this.uploadError = []
      }
    },

    watch: {
      showLoadBox(newVal) {
        this.isShowLoadBox = newVal
        return newVal
      }
    }
  }
</script>

<style scoped>
  /*上传弹窗*/
  .up-dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 6;
  }

  .up-dialog .up-dialogBox {
    width: 42%;
    min-height: 300px;
    border-radius: 5px;
  }

  .upLoadList {
    min-height: 260px;
  }

  .uploadSmall {
    width: 200px;
    height: 200px;
    position: fixed;
    bottom: 350px;
    right: 350px;
    display: none;
    z-index: 8;
    transition: all 1s;
  }

  .animate-small {
    display: block;
    bottom: 50px;
    right: 50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    animation: beSmall 1s ease-in-out;
  }

  @keyframes beSmall {
    0% {
      display: block;
      position: fixed;
      bottom: 350px;
      right: 350px;
      width: 200px;
      height: 200px;
      border-radius: 0%;
    }

    100% {
      display: block;
      bottom: 50px;
      right: 50px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }

  /*上传*/
  .upload-demo {
    position: relative;
  }

  .upload-btn {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px
  }

</style>
