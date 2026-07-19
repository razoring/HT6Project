import bpy

filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)
obj = bpy.data.objects.get("BrownBunny")
arm = bpy.data.objects.get("BunnyArmature")

mod = obj.modifiers.get("Armature")
if not mod:
    mod = obj.modifiers.new("Armature", 'ARMATURE')
mod.object = arm

# Record vertex 0 position in world space
bpy.context.view_layer.update()
v0_pos_start = obj.matrix_world @ obj.data.vertices[0].co

# Move a bone
arm.pose.bones["Ear.L"].rotation_euler = (1.0, 0, 0)
arm.pose.bones["Ear.L"].rotation_mode = 'XYZ'
bpy.context.view_layer.update()

v0_pos_end = obj.matrix_world @ obj.data.vertices[0].co
print(f"Vertex 0 moved: {v0_pos_start != v0_pos_end}")
print(f"Start: {v0_pos_start}, End: {v0_pos_end}")

# Find a vertex in Ear.L vertex group
vg_ear = obj.vertex_groups.get("Ear.L")
for v in obj.data.vertices:
    for g in v.groups:
        if g.group == vg_ear.index and g.weight > 0.0:
            v_ear_pos_start = obj.matrix_world @ v.co
            arm.pose.bones["Ear.L"].rotation_euler = (0, 0, 0)
            bpy.context.view_layer.update()
            
            arm.pose.bones["Ear.L"].rotation_euler = (1.5, 0, 0)
            bpy.context.view_layer.update()
            
            v_ear_pos_end = obj.matrix_world @ v.co
            print(f"Ear vertex moved: {v_ear_pos_start != v_ear_pos_end}")
            break
    else:
        continue
    break

