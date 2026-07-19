import bpy
filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)

obj = bpy.data.objects.get("BrownBunny")
arm = bpy.data.objects.get("BunnyArmature")

obj.parent = arm
obj.parent_type = 'OBJECT'

mod = None
for m in obj.modifiers:
    if m.type == 'ARMATURE':
        mod = m
        break

if not mod:
    mod = obj.modifiers.new(name="Armature", type='ARMATURE')

mod.object = arm
mod.use_vertex_groups = True
mod.show_viewport = True
mod.show_render = True

bpy.context.view_layer.objects.active = obj

bpy.ops.object.select_all(action='DESELECT')
obj.select_set(True)
arm.select_set(True)
bpy.context.view_layer.objects.active = arm

export_path = r"c:\Users\conta\OneDrive\Documents\Personal\Projects\Coding\HT6Project\HT6-Project\public\bunny.glb"

bpy.ops.export_scene.gltf(
    filepath=export_path,
    use_selection=True,
    export_format='GLB',
    export_skins=True,
    export_morph=True,
    export_yup=True
)
print("GLB EXPORTED")
