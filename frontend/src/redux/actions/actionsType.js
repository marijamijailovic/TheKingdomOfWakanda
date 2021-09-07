export const request = (state) => {
    state.loading = true
}

export const success = (state, action) => {
    state.loading = false
    state.hasErrors = false
    state.data = action.payload
}

export const failure = (state, action) => {
    state.loading = false
    state.hasErrors = true
    state.error = action.payload
}