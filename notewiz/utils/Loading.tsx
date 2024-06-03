import RingLoader from "react-spinners/RingLoader";
interface LoadingProps {
    loading: boolean;
  }
const Loading = ({loading}:LoadingProps) => {
    return (
        <div className="flex justify-center w-full items-center bg-black h-screen">
            <RingLoader color={'#00E340'} loading={loading} size={150}/>
        </div>
    )
}

export default Loading
