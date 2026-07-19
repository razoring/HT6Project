import bpy
filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)

export_path = r"c:\Users\conta\OneDrive\Documents\Personal\Projects\Coding\HT6Project\HT6-Project\public\bunny.glb"

# Ensure modifier
obj = bpy.data.objects.get("BrownBunny")
arm = bpy.data.objects.get("BunnyArmature")
mod = obj.modifiers.get("Armature")
if not mod:
    mod = obj.modifiers.new("Armature", 'ARMATURE')
mod.object = arm

bpy.ops.export_scene.gltf(
    filepath=export_path,
    use_selection=False,
    export_format='GLB',
    export_skins=True,
    export_morph=True,
    export_yup=True,
    export_apply=False
)
print("EXPORT DONE")
