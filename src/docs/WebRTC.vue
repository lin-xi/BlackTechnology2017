<template>
	<div>
    <h1>WebRTC</h1>
    <p>
      2010年5月，Google花费6820万美元收购拥有编解码、回声消除等技术的 GIPS 公司。之后谷歌开源了 GIPS 的技术，与相关机构 IETF 和 W3C 制定行业标准，组成了现有的 WebRTC 项目。
      WebRTC 全称 Web Real-Time Communication。它并不是单一的协议， 包含了媒体、加密、传输层等在内的多个协议标准以及一套基于 JavaScript 的 API。通过简单易用的 JavaScript API ，在不安装任何插件的情况下，让浏览器拥有了 P2P音视频和数据分享的能力。
      <br/><br/>
      2017年 Safari 11 支持了WebRTC，现在已经被所有主流浏览器（Chrome，Firefox，Microsoft Edge， Safari）所支持，webRTC在的应用前景令人憧憬
    </p>

    <h2>WebRTC 应用包括下面四个主要的概念：</h2>
    <p>
      <code>信令服务器（Signalling servers）</code> 用于在两个用户之间交换信息, 初始化连接
      <br/><br/>
      为参与点对点通信的两个浏览器之间交换会话描述协议（SDP）。SDP 包含浏览器的 RTP 媒体栈配置所需的全部信息，包括媒体类型（音频、视频、数据）、所需的编解码器，用于编解码器的哥哥参数或设置，以及有关带宽的信息。此外，信令通道还用于交换候选地址，以便进行 ICE 打洞。
    </p>
    <p>
      <code>ICE 服务器（ICE servers）</code> 交互式建立连接（ICE）是一种标准穿透协议, 让位于 NAT 之后的两个浏览器之间能直接发送和接收数据包

      <br/><br/>
      <b>STUN</b>: STUN（Simple Traversal of UDP over NATs，NAT 的UDP简单穿越）是一种网络协议，它允许位于NAT（或多重NAT）后的客户端找出自己的公网地址。
      <br>
      <b>TURN</b>: 在大多情况下，通过穿透可以建立直接对等连接。但是，若 NAT 或防火墙限制非常严格，无法建立连接，就只能通过 TURN 服务器中继媒体。

    </p>
    <p>
      <code>媒体服务器 （Media servers）</code>  媒体服务器不是必须的
    </p>
    <p>
      <code>JavaScript 接口 （JavaScript API）</code>
    </p>


    <h2>技术实现</h2>
    
    <table>
      <tr>
        <td>
          <video width="640px" height="360px" ref="myVideo">
          </video>
        </td>
        <td>
          <video width="640px" height="360px" ref="remoteVideo">
          </video>
        </td>
      </tr>
    </table>

    <p>
      <button @click="swap">1和10互换</button> 
    </p>
    
  </div>
</template>

<script>
let localStream;

import io from 'socket.io-client';

export default {
  name: 'doc-grid',
  methods: {
    swap () {
      this.$refs.cell1.className = 'cell7'
      this.$refs.cell7.className = 'cell1'
    },

    ice () {

      const socket = io('http://localhost:9001');
      socket.on('message', function (data) {
        // console.log(data);
      });

      let iceServer = {
        "iceServers": [{
          "url": "stun:stunserver.org"
        }]
      }
      let pc = new RTCPeerConnection(iceServer)
      pc.addStream(localStream)

      pc.onicecandidate = function(event) {
        if (event.candidate) {
          console.log(event.candidate)
          socket.emit('candidate', event.candidate)
        }
      }

      pc.oniceconnectionstatechange = function(event) {
        console.log(event)
      }
    }
    
  },
  mounted () {
    this.$nextTick( () => {

      let video = this.$refs.myVideo
      window.navigator.getUserMedia({audio: false, video: true}, (stream) => {
        localStream = stream
        if (window.URL) {
          video.src = window.URL.createObjectURL(stream)
        } else {
          video.src = stream
        }
        this.ice()

      }, (error) => {
        console.log(error)
        alert(error.message)
      })

    })
  }
}
</script>

<style lang="less">

</style>
