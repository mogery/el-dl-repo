import * as TaskManager from 'expo-task-manager';

export const BGLOC_TASK_NAME = "com.mogery.eldlrepro_task";

TaskManager.defineTask(BGLOC_TASK_NAME, (params) => {
    if (params.error) {
        console.error("[BGLOC]", params.error);
    } else {
        console.log("[BGLOC]", params.data.locations);
    }
});

console.log("[BGLOC] Registered task", BGLOC_TASK_NAME);