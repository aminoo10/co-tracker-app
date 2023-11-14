import Image from 'next/image';

export default function Test() {
    const imageWidth: number = 435;
    const imageHeigth: number = 326;
    
    return (
        <div>
            <h1>This is a test page</h1>
            <Image src="/images/ezgif-2-4ccadb4f26.gif" alt="whatever" width={imageWidth} height={imageHeigth}/>
        </div>
    )
}
  