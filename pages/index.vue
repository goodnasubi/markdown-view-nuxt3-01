<template>
    <v-app>
      <v-system-bar color="secondary">
        System Bar
      </v-system-bar>
      <v-app-bar color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon
              variant="text"
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
          Application Bar
        </v-app-bar-title>
        <template v-slot:append>
          <v-btn>
            Sign-In
          </v-btn>
  
          <v-btn>
            <v-icon>
              mdi-home
            </v-icon>
          </v-btn>
        </template>
      </v-app-bar>
  
      <v-navigation-drawer permanent location="right" v-model="drawer" >
        Navigation Drawer
      </v-navigation-drawer>
  
      <v-main>
        <v-container v-resize-observer="onResizeObserver">
          <v-sheet v-for="message in messages" :key="message.id" class="my-16 d-flex" :style="{
            position: 'relative',
          }">
            <v-avatar :color="message.role === 'user' ? 'primary' : 'secondary'" class="mr-2">
              <v-icon>{{ message.role === 'user' ? 'mdi-account' : 'mdi-robot' }}</v-icon>
            </v-avatar>
            <v-card :class="message.role === 'user' ? 'user-message' : 'ai-message'" class="pa-4 mb-4" :color="message.role === 'user' ? 'primary' : 'secondary'" :style="{
              borderRadius: '10px',
            }">
              {{ message.role === 'user' ? '私: ' : 'AI: ' }}
              <div>--- オリジナルのレスポンス: --------<br />
                <AssistantMessageOriginalView :content="message.content" />
                <br />--- markdown変換後: --------</div>
              <AssistantMessage :content="message.content" class="px-1" />
            </v-card>
          </v-sheet>
          <v-form @submit="handleSubmit" 
            :style="{ position: 'fixed', bottom: '50px', width: '80%' }"
            >
            <v-textarea v-model="input"
              clearable auto-grow counter variant="solo"
              label="メッセージを送信"
              bg-color="red"
              rows="1"
              @keydown.enter.shift="handleSubmit"
              >
              <template #prepend>
                <v-icon
                primary
                @click="goHome"
                >mdi-home</v-icon>
              </template>
              <template #append-inner>
                <v-icon :color="input ? 'primary' : ''" @click="handleSubmit" :disabled="!input">mdi-send</v-icon>
              </template>
            </v-textarea>
          </v-form>
        </v-container>
      </v-main>
  
      <!-- <v-bottom-navigation>
        Button Navigation
      </v-bottom-navigation> -->
      <v-footer color="primary" app>
        FinDoc
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    data: () => ({
      drawer: false,
    }),
    updated() {
        this.scrollToEnd()
    },
    methods: {
        scrollToEnd() {
              this.$nextTick(() => {
                  const chatLog = this.$refs.chat_area
                  if (!chatLog) return
                  chatLog.scrollTop = chatLog.scrollHeight
              })
        }
    }
  }
  </script>
  
  <script setup>
  // import { useChat } from 'ai/vue'
  import { useChat } from '@ai-sdk/vue';
  import { vResizeObserver } from '@vueuse/components'
  
  const { counter, inc, isHome, goHome } = useGoHome()
  
  const { messages, input, handleSubmit } = useChat({
    headers: { 'Content-Type': 'application/json' },
  })

  const text = ref('')
  function onResizeObserver(entries) {
    const [entry] = entries
    const { width, height } = entry.contentRect
    text.value = `width: ${width}, height: ${height}`
    console.log("座標：", text.value, entry)
    // entry.target.scrollTop = height
    window.scrollTo ({
       top: height,
       behavior: "smooth"
     })
  }
  </script>
  