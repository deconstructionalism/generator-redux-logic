export const PUSH_FEEDBACK = 'PUSH_FEEDBACK'

export const REMOVE_FEEDBACK = 'REMOVE_FEEDBACK'

export const pushFeedback = (message, type) => ({
  type: PUSH_FEEDBACK,
  payload: { message, type }
})

export const removeFeedback = (index) => ({
  type: REMOVE_FEEDBACK,
  payload: { index }
})
