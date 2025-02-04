<template>
  <div style="height: 100%; position: relative">
    <div class="absolute-center full-width">
      <div class="row justify-evenly">
        <div class="col-4 text-center">
          <q-btn
            rounded
            stack
            no-caps
            flat
            to="/ai-chat"
            style="min-width: 200px; min-height: 125px"
          >
            <q-icon name="mdi-robot-outline" size="64px" />
            <q-space />
            <q-btn-label>AI Chat</q-btn-label>
          </q-btn>
        </div>
        <div class="col-4 text-center">
          <q-btn
            rounded
            stack
            no-caps
            flat
            to="/document-intelligence"
            style="min-width: 200px; min-height: 125px"
          >
            <q-icon name="mdi-file-document-outline" size="64px" />
            <q-space />
            <q-btn-label>Document<br />Intelligence</q-btn-label>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
