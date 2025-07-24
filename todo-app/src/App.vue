<template>
	<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
		<div class="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
			<h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">My To-Do List</h1>

			<div class="flex mb-4">
				<input
					v-model="newTodoText"
					@keyup.enter="addTodo"
					type="text"
					placeholder="Add a new todo..."
					class="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
				<button
					@click="addTodo"
					class="bg-blue-600 text-white px-5 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
					Add
				</button>
			</div>

			<div v-if="sortedTodos.length === 0" class="text-center text-gray-500 py-8">No todos yet! Start by adding one above.</div>

			<ul v-else class="space-y-2">
				<li
					v-for="todo in sortedTodos"
					:key="todo.id"
					class="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition duration-200 group"
					:class="{ 'opacity-60': todo.checked }">
					<div @click="toggleTodo(todo.id)" class="flex items-center flex-grow cursor-pointer">
						<input type="checkbox" :checked="todo.checked" class="form-checkbox h-5 w-5 text-blue-600 rounded mr-3 cursor-pointer" />
						<span :class="{ 'line-through text-gray-500': todo.checked }" class="text-lg text-gray-800 flex-grow break-words">
							{{ todo.text }}
						</span>
					</div>
					<button
						@click="deleteTodo(todo.id)"
						class="ml-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none"
						aria-label="Delete todo">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const newTodoText = ref('')
const todos = ref([])

const STORAGE_KEY = 'todo-list'

onMounted(() => {
	const savedTodos = localStorage.getItem(STORAGE_KEY)
	if (savedTodos) {
		todos.value = JSON.parse(savedTodos)
	}
})

watch(
	todos,
	(newTodos) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
	},
	{ deep: true }
)

const addTodo = () => {
	if (newTodoText.value.trim() === '') {
		alert('Please enter a valid text.')
		return
	}

	todos.value.push({
		id: Date.now(),
		text: newTodoText.value.trim(),
		checked: false,
		createdAt: new Date().toISOString(),
		completedAt: null,
	})
	newTodoText.value = ''
}

const toggleTodo = (id) => {
	const todo = todos.value.find((t) => t.id === id)
	if (todo) {
		todo.checked = !todo.checked
		todo.completedAt = todo.checked ? new Date().toISOString() : null
	}
}

const deleteTodo = (id) => {
	todos.value = todos.value.filter((t) => t.id !== id)
}

const sortedTodos = computed(() => {
	const activeTodos = todos.value.filter((todo) => !todo.checked)
	const completedTodos = todos.value.filter((todo) => todo.checked)

	activeTodos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

	completedTodos.sort((a, b) => {
		const timeA = a.completedAt ? new Date(a.completedAt).getTime() : Infinity
		const timeB = b.completedAt ? new Date(b.completedAt).getTime() : Infinity
		return timeA - timeB
	})

	return [...activeTodos, ...completedTodos]
})
</script>
