<template>
  <b-card ref="card" class="quiz-card b-card-img-top" tag="article" no-body>
    <template #header>
      <ImageAspect :src="imgSrc" :alt="imgAlt" :ratio="0.7" class="card-img" />
    </template>
    <b-card-body class="title-body">
      <b-card-title>{{ title }}</b-card-title>

      <b-card-text v-if="hasTextSlot">
        <slot name="text" />
      </b-card-text>
    </b-card-body>

    <slot />

    <template #footer>
      <div slot="footer" class="footer-content">
        <div class="footer-l"><slot name="footer" /></div>
        <div class="footer-r">
          <b-button
            variant="primary"
            :disabled="!nextButtonEnabled"
            @click="$emit('next')"
          >
            {{ nextButtonText }}
          </b-button>
        </div>
      </div>
    </template>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ImageAspect from './ImageAspect.vue'

@Component({
  components: {
    ImageAspect,
  },
})
export default class extends Vue {
  @Prop()
  public title!: string

  @Prop()
  public imgSrc!: string

  @Prop()
  public imgAlt!: string

  @Prop({ default: true })
  public centerScroll!: true

  @Prop({ default: 'Dalej' })
  public nextButtonText!: string

  @Prop({ default: true })
  public nextButtonEnabled!: boolean

  get hasTextSlot(): boolean {
    return !!this.$slots.text
  }

  public mounted() {
    if (!this.centerScroll) {
      return
    }
    const cardRef = this.$refs.card as any
    cardRef.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
}
</script>
<style>
.quiz-card {
  margin-top: 2rem;
  width: 100%;
  box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.7);
  border: 0;
}

.quiz-card .card-header {
  padding: 0;
  background: black;
}

.quiz-card .card-footer {
  text-align: right;
}

.quiz-card .footer-content {
  width: 100%;
  display: flex;
  flex-direction: row nowrap;
}

.quiz-card .footer-content .footer-l {
  flex-grow: 1;
  padding-right: 1rem;
}

.quiz-card .footer-content .footer-lr {
  flex-grow: 0;
}
</style>
