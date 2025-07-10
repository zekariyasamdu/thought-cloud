import { Checkbox } from "../ui/checkbox"

export function PrivateSharedSwitch({ isPrivate, setPrivate, isShare, setShare }: { isPrivate: boolean, isShare: boolean, setPrivate: React.Dispatch<React.SetStateAction<boolean>>, setShare: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <div className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm" >
                <div className="flex flex-col text-sm">
                    <p>Private</p>
                    <p className="text-gray-600">No one can contribute to the text</p>
                </div>

                <Checkbox
                    checked={isPrivate}
                    disabled={isShare}
                    onCheckedChange={() => setPrivate(!isPrivate)}
                />

            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="flex flex-col text-sm">
                    <p>Shared</p>
                    <p className="text-gray-600">You can add Friends</p>
                </div>
                <Checkbox
                    checked={isShare}
                    disabled={isPrivate}
                    onCheckedChange={() => setShare(!isShare)}
                />
            </div>

        </div>
    )
}
