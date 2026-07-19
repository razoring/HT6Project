import json
import struct

filepath = r"c:\Users\conta\OneDrive\Documents\Personal\Projects\Coding\HT6Project\HT6-Project\public\bunny.glb"
with open(filepath, "rb") as f:
    data = f.read()

magic = data[0:4]
version = struct.unpack("<I", data[4:8])[0]
total_length = struct.unpack("<I", data[8:12])[0]

json_chunk_len = struct.unpack("<I", data[12:16])[0]
json_chunk_type = data[16:20]
json_data = data[20:20+json_chunk_len]

gltf = json.loads(json_data.decode("utf-8"))

patched = False
for node in gltf.get("nodes", []):
    if node.get("name") == "BrownBunny":
        node["skin"] = 0
        patched = True
        print("Patched BrownBunny with skin=0")

if patched:
    new_json_data = json.dumps(gltf).encode("utf-8")
    
    # Pad to match original length
    if len(new_json_data) <= json_chunk_len:
        new_json_data = new_json_data.ljust(json_chunk_len, b' ')
        
        # reconstruct file
        with open(filepath, "wb") as f:
            f.write(data[0:20])
            f.write(new_json_data)
            f.write(data[20+json_chunk_len:])
        print("Successfully patched and wrote GLB")
    else:
        print("Error: New JSON is larger than old JSON, cannot pad.")
else:
    print("BrownBunny node not found or not patched.")
