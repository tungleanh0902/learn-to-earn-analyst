import { create } from "zustand";
import { callApi } from "./helper"

export const createTrackingStore = create((set: any, get: any, next: any) => (
    {
        dau: [],
        mau: [],
        quizzbyday: [],
        dropgamebyday: [],
        meanmatchingbyday: [],
        cvprofiles: [],
        
        getDau: async () => {
            await callApi('tracking/dau', "POST", null, (res: any) => {
                set({dau: res.data})
            }, null)
        },

        getMau: async () => {
            await callApi('tracking/mau', "POST", null, (res: any) => {
                set({ mau: res.data })
            }, null)
        },

        getQuizzByDay: async () => {
            await callApi('tracking/quizz_by_day', "POST", null, (res: any) => {
                set({ quizzbyday: res.data })
            }, null)
        },

        getDropGameByDay: async () => {
            await callApi('tracking/quizz_by_day', "POST", null, (res: any) => {
                set({ dropgamebyday: res.data })
            }, null)
        },

        getMeanMatchingGameByDay: async () => {
            await callApi('tracking/mean_matching_by_day', "POST", null, (res: any) => {
                set({ meanmatchingbyday: res.data })
            }, null)
        },

        getCVProfiles: async () => {
            await callApi('tracking/cv_profile', "POST", null, (res: any) => {
                set({ cvprofiles: res.data })
            }, null)
        },
    }))