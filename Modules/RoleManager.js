const { RoleManager } = require('discord.js');

// Function to create a role
const createRole = async (guild, roleName, roleEmoji) => {
    try {
        const role = await guild.roles.create({
            name: roleName,
            reason: `Role ${roleName} created by bot`,
        });

        console.log(`Role ${roleName} created!`);
        return role;
    } catch (error) {
        console.error('Error creating role:', error);
    }
};

// Function to delete a role
const deleteRole = async (guild, roleName) => {
    const role = guild.roles.cache.find(r => r.name === roleName);
    if (!role) {
        console.log('Role not found');
        return;
    }

    try {
        await role.delete();
        console.log(`Role ${roleName} deleted!`);
    } catch (error) {
        console.error('Error deleting role:', error);
    }
};

module.exports = { createRole, deleteRole };
