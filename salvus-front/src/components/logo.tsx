import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center rounded-md">
      <Image src="/salvus.webp" height={95} width={95} alt="salvus logo" />
    </div>
  )
}
