<template>
  <component 
    :is="item.type === 'dropdown' ? 'div' : 'NuxtLink'"
    :to="item.type === 'link' ? item.href : undefined"
    class="relative group"
  >
    <button 
      v-if="item.type === 'dropdown'"
      @click="$emit('click', item)"
      class="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm"
      :class="pillClasses"
    >
      <span>{{ item.label }}</span>
      <svg 
        class="w-3 h-3 transition-transform duration-200" 
        :class="{ 'rotate-180': isDropdownOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    
    <div 
      v-else
      class="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm cursor-pointer"
      :class="pillClasses"
      @click="$emit('click', item)"
    >
      <span>{{ item.label }}</span>
    </div>

    <!-- Active indicator -->
    <div 
      v-if="isActive"
      class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
    ></div>

    <!-- Dropdown for categories -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="item.type === 'dropdown' && isDropdownOpen"
        class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
      >
        <CategoryMenu />
      </div>
    </Transition>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface NavItem {
  id: string;
  label: string;
  href: string;
  type: 'link' | 'dropdown';
  component?: string;
}

interface Props {
  item: NavItem;
  isActive: boolean;
  isDropdownOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDropdownOpen: false
});

const emit = defineEmits<{
  click: [item: NavItem];
}>();

const pillClasses = computed(() => ({
  'bg-blue-600 text-white shadow-lg shadow-blue-600/25': props.isActive,
  'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-700/60': !props.isActive,
  'transform hover:scale-105': true
}));
</script>
