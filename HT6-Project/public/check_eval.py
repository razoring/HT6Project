import bpy

filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)
obj = bpy.data.objects.get("BrownBunny")
arm = bpy.data.objects.get("BunnyArmature")

mod = obj.modifiers.get("Armature")
if not mod:
    mod = obj.modifiers.new("Armature", 'ARMATURE')
mod.object = arm

bpy.context.view_layer.update()
depsgraph = bpy.context.evaluated_depsgraph_get()
eval_obj = obj.evaluated_get(depsgraph)

vg_ear = obj.vertex_groups.get("Ear.L")
for i, v in enumerate(obj.data.vertices):
    for g in v.groups:
        if g.group == vg_ear.index and g.weight > 0.0:
            v_start = eval_obj.data.vertices[i].co.copy()
            
            arm.pose.bones["Ear.L"].rotation_mode = 'XYZ'
            arm.pose.bones["Ear.L"].rotation_euler = (1.5, 0, 0)
            
            bpy.context.view_layer.update()
            depsgraph = bpy.context.evaluated_depsgraph_get()
            eval_obj2 = obj.evaluated_get(depsgraph)
            
            v_end = eval_obj2.data.vertices[i].co.copy()
            print(f"Vertex {i} moved: {v_start != v_end}")
            print(f"Start: {v_start}, End: {v_end}")
            break
    else:
        continue
    break
