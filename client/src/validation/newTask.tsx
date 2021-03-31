const validateTask = (name: string) => {
    if (name === "") {
        return {
            error: {
                message: "Task name should not be empty."
            }
        };
    };

    return false;
}



export { validateTask };