const LoadingSpinner = ({children, statement}) => {
    if(statement) {
        return children
    } else {
        return (<div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>)
    }
}

export default LoadingSpinner;