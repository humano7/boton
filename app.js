const { createApp, ref } = Vue;

const app = createApp({
    template : `
            <div class="mx-auto p-4" style="max-width: 350px;">
                
                <h1 class="text-2xl font-bold mb-4">Dashboard de Control</h1>
                
                <div class="space-y-4">
                    <!-- Estado de Salud de Redes -->
                    <div class="bg-white shadow rounded-lg p-4">
                    <h2 class="text-lg font-semibold mb-2 flex items-center">
                        <activity-icon class="mr-2 h-5 w-5" />
                        Estado de Redes
                    </h2>
                    <div v-for="(status, network) in networkStatus" :key="network" class="flex items-center justify-between mb-2">
                        <span class="capitalize text-sm">{{ network }}</span>
                        <circle-icon :class="`h-4 w-4 text-${status}-500`" />
                    </div>
                    </div>
            
                    <!-- Últimas Noticias -->
                    <div class="bg-white shadow rounded-lg p-4">
                    <h2 class="text-lg font-semibold mb-2">Últimas Noticias</h2>
                    <div class="h-[60px] flex items-center">
                        <p class="text-sm">{{ news[currentNewsIndex] }}</p>
                    </div>
                    </div>
            
                    <!-- Agente IA -->
                    <div class="bg-white shadow rounded-lg p-4">
                    <h2 class="text-lg font-semibold mb-2 flex items-center">
                        <message-square-icon class="mr-2 h-5 w-5" />
                        Asistente IA
                    </h2>
                    <div class="mb-2 h-[80px] overflow-y-auto bg-gray-100 p-2 rounded text-sm">
                        {{ aiMessage }}
                    </div>
                    <div class="flex flex-col space-y-2">
                        <input
                        v-model="userInput"
                        placeholder="Escribe tu mensaje..."
                        class="border rounded p-2 text-sm"
                        />
                        <button @click="handleSendMessage" class="bg-blue-500 text-white rounded p-2 text-sm">Enviar</button>
                    </div>
                    </div>
            
                    <!-- Información de Urgencia -->
                    <div class="bg-white shadow rounded-lg p-4">
                    <h2 class="text-lg font-semibold mb-2 flex items-center">
                        <alert-circle-icon class="mr-2 h-5 w-5" />
                        Información de Urgencia
                    </h2>
                    <div v-for="(info, index) in urgentInfo" :key="index" class="mb-2 text-sm">
                        <span class="font-bold">Turno {{ info.turno }}:</span> {{ info.numero }}
                    </div>
                    </div>
                </div>
                </div>
    `,

    setup(){
        import { ref, onMounted, onUnmounted } from 'vue'
        import { Activity, MessageSquare, AlertCircle, Circle } from 'lucide-vue-next'
        
        // Componentes de iconos
        const ActivityIcon = Activity
        const MessageSquareIcon = MessageSquare
        const AlertCircleIcon = AlertCircle
        const CircleIcon = Circle
        
        // Estado
        const aiMessage = ref('')
        const userInput = ref('')
        const currentNewsIndex = ref(0)
        
        const networkStatus = {
            desarrollo: "green",
            calidad: "yellow",
            produccion: "red"
        }
        
        const news = [
            "Nueva actualización del sistema prevista para el próximo mes",
            "Mejoras de seguridad implementadas en la red de producción",
            "Capacitación sobre nuevas herramientas programada para la próxima semana",
            "Récord de eficiencia alcanzado en la red de desarrollo"
        ]
        
        const urgentInfo = [
            { turno: "A", numero: "5678" },
            { turno: "B", numero: "9012" },
            { turno: "C", numero: "3456" }
        ]
        
        // Métodos
        const handleSendMessage = () => {
            aiMessage.value = "Gracias por tu mensaje. Estoy procesando tu solicitud."
            userInput.value = ""
        }
        
        // Efectos
        let interval
        onMounted(() => {
            interval = setInterval(() => {
            currentNewsIndex.value = (currentNewsIndex.value + 1) % news.length
            }, 15000)
        })
        
        onUnmounted(() => {
            clearInterval(interval)
        })
    }

});



createApp(app).mount('#previops')