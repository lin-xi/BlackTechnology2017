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

    房间地址：<input class="roomUrl" readonly="true" v-model="roomUrl"/>
    <table>
      <tr>
        <td>
          <video width="480px" height="320px" ref="myVideo">
          </video>
        </td>
        <td>
          <video width="480px" height="320px" ref="remoteVideo">
          </video>
        </td>
      </tr>
    </table>

    1. getUserMedia
<pre>
  <code>
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
  </code>
</pre>

    2. 信令服务器，可以用socket.io实现，demo中用ScaleDrone提供的免费服务当服务器

<pre>
  <code>
      socket = new ScaleDrone('OXo4HSBTCQ8ehrxI');

      socket.on('open', (error) => {
        if (error) { return console.error(error);}

        let room = socket.subscribe(this.roomName);
        room.on('open', function(error){
            if (error) {onError(error);}
        });

        room.on('members', (members) => {
          console.log('MEMBERS', members);
          // 如果你是第二个链接到房间的人，就会创建offer
          let isOffer = members.length === 2;
          this.startWebRTC(isOffer);
        })

        // 从Scaledrone监听信令数据
        room.on('data', (message, client) => {
          //不处理自己发送消息
          if (client.id === socket.clientId) {
              return;
          }

          if (message.sdp) {
            // 设置远程sdp, 在offer 或者 answer后
            pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                // 当收到offer 后就接听
              if (pc.remoteDescription.type === 'offer') {

                  pc.createAnswer().then((answer) => {
                    pc.setLocalDescription(answer, () => {
                      this.sendMessage({ 'sdp': pc.localDescription });
                    }, this.onError);
                  }).catch(this.onError);
              }
            }, onError);
          } else if (message.candidate) {
            // 增加新的 ICE canidatet 到本地的链接中
            pc.addIceCandidate(new RTCIceCandidate(message.candidate));
          }
        })

      })
  </code>
</pre>
    
    3. ICE

<pre>
  <code>
      const iceServer = {
        "iceServers": [{
          urls: 'stun:stun.l.google.com:19302'
        }]
      }
      pc = new RTCPeerConnection(iceServer)

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('>>>>onicecandidate')
            this.sendMessage({ 'candidate': event.candidate });
        }
      }

      if (isOffer) {
        pc.onnegotiationneeded = () => {
          // 创建本地sdp描述 (Session Description Protocol) 
          pc.createOffer().then((sdp) => {
            pc.setLocalDescription(sdp, () => {
              this.sendMessage({'sdp': pc.localDescription });
            }, this.onError);
          }).catch(this.onError);
        }
      }

      pc.onaddstream = function (evt) {
        this.$refs.remoteVideo.src = window.URL.createObjectURL(evt.stream)
      }

      window.navigator.getUserMedia({ "audio": true, "video": true }, (stream) => {
        this.$refs.myVideo.src = stream
        pc.addStream(stream);
      }, this.onError)
  </code>
</pre>

    <h2>总结</h2>
      1. 创建 RTCPeerConnection <br>
      2. getUserMedia 获取流，RTCPeerConnection 添加流 <br>
      3. 发起方，创建 offer， 设置本地描述，发送 SDP（Session Description Protocol）<br>
      4. 接受方，接受 offer，设置远程描述，创建 answer, 设置本地描述，发送 SDP （Session Description Protocol）<br>
      4. 发起方，接受offer，设置远程描述，创建 answer, 设置本地描述，发送 SDP （Session Description Protocol）<br>
      5. 处理 onicecandidate， <br>
      5. 处理 onicecandidate， <br>
      6. 处理onaddstream <br>


  </div>
</template>

<script>
let socket;
let pc;

export default {
  name: 'doc-webRTC',
  data () {
    return {
      roomUrl: '',
      roomName: ''
    }
  },
  methods: {
    getUrlParam (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
      var r = window.location.search.substr(1).match(reg);  
      if (r != null) return unescape(r[2]); return null;  
    },

    start () {
      // const socket = io('http://localhost:9001');
      socket = new ScaleDrone('OXo4HSBTCQ8ehrxI');

      socket.on('open', (error) => {
        if (error) { return console.error(error);}

        let room = socket.subscribe(this.roomName);
        room.on('open', function(error){
            if (error) {onError(error);}
        });

        room.on('members', (members) => {
          console.log('MEMBERS', members);
          // 如果你是第二个链接到房间的人，就会创建offer
          let isOffer = members.length === 2;
          this.startWebRTC(isOffer);
        })

        // 从Scaledrone监听信令数据
        room.on('data', (message, client) => {
          //不处理自己发送消息
          if (client.id === socket.clientId) {
              return;
          }

          if (message.sdp) {
            // 设置远程sdp, 在offer 或者 answer后
            console.log('sdp消息：', message)
            pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                // 当收到offer 后就接听
              console.log('sdp消息类型：', pc.remoteDescription.type)
              if (pc.remoteDescription.type === 'offer') {
                  pc.createAnswer().then((answer) => {
                    pc.setLocalDescription(answer, () => {
                      this.sendMessage({ 'sdp': pc.localDescription });
                    }, this.onError);
                  }).catch(this.onError);
              }
            }, onError);
          } else if (message.candidate) {
            console.log('candidate消息：', message)
            // 增加新的 ICE canidatet 到本地的链接中
            pc.addIceCandidate(new RTCIceCandidate(message.candidate));
          }
        })

      })

    },

    startWebRTC (isOffer) {
      const iceServer = {
        "iceServers": [{
          urls: 'stun:stun.l.google.com:19302'
        }]
      }
      pc = new RTCPeerConnection(iceServer)

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('>>>>onicecandidate')
            this.sendMessage({ 'candidate': event.candidate });
        }
      }

      if (isOffer) {
        pc.onnegotiationneeded = () => {
          // 创建本地sdp描述 (Session Description Protocol) 
          pc.createOffer().then((sdp) => {
            pc.setLocalDescription(sdp, () => {
              this.sendMessage({'sdp': pc.localDescription });
            }, this.onError);
          }).catch(this.onError);
        }
      }

      pc.onaddstream = function (evt) {
        this.$refs.remoteVideo.src = window.URL.createObjectURL(evt.stream)
      }

      window.navigator.getUserMedia({ "audio": true, "video": true }, (stream) => {
        this.$refs.myVideo.src = stream
        pc.addStream(stream);
      }, this.onError)

    },

    sendMessage (message) {
      socket.publish({
        room: this.roomName,
        message
      })
    },

    onError (error) {
      console.log(error)
    }
    
  },
  mounted () {
    this.$nextTick( () => {
      this.roomName = this.getUrlParam('room')
      if (!this.roomName) {
        this.roomName = 'observable-' + Date.now()
        this.roomUrl = location.href + `?room=${this.roomName}`
      }

      this.start()
    })
  }
}
</script>

<style lang="less">
  .roomUrl{
    height: 40px;
    width: 70%;
  }
</style>
