const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

module.exports.run = async (client) => {
    const configFile = fs.readFileSync(path.resolve(__dirname, '../config.yml'), 'utf8');
    const config = yaml.load(configFile);

    client.on('presenceUpdate', async (oldPresence, newPresence) => {
        if (!oldPresence || !newPresence) return;

        const member = newPresence.guild.members.cache.get(newPresence.userId);
        if (!member) return;

        const oldStatus = oldPresence.activities.find(activity => activity.state)?.state || "";
        const newStatus = newPresence.activities.find(activity => activity.state)?.state || "";

        const statusConfig = config.Status;
        let addedRoles = [];
        let removedRoles = [];

        for (const key in statusConfig) {
            const { Status, WhitelistRole, Roles } = statusConfig[key];

            if (newStatus.includes(Status) && !oldStatus.includes(Status)) {
                if (WhitelistRole.length > 0 && !WhitelistRole.some(roleId => member.roles.cache.has(roleId))) {
                    continue;
                }

                for (const roleId of Roles) {
                    const role = newPresence.guild.roles.cache.get(roleId);
                    if (role) {
                        await member.roles.add(role);
                        addedRoles.push(roleId);
                    }
                }

                if (config.Logging.Enabled && addedRoles.length > 0) {
                    const logChannel = client.channels.cache.get(config.Logging.ChannelID);
                    if (logChannel) {
                        const embed = createEmbed(config.Logging.Add.Embed, member, newStatus, addedRoles);
                        logChannel.send({ embeds: [embed] });
                    }
                }
            }
        }

        for (const key in statusConfig) {
            const { Status, Roles } = statusConfig[key];

            if (!newStatus.includes(Status) && oldStatus.includes(Status)) {
                for (const roleId of Roles) {
                    const role = newPresence.guild.roles.cache.get(roleId);
                    if (role) {
                        await member.roles.remove(role);
                        removedRoles.push(roleId);
                    }
                }

                if (config.Logging.Enabled && removedRoles.length > 0) {
                    const logChannel = client.channels.cache.get(config.Logging.ChannelID);
                    if (logChannel) {
                        const embed = createEmbed(config.Logging.Remove.Embed, member, oldStatus, removedRoles, true);
                        logChannel.send({ embeds: [embed] });
                    }
                }
            }
        }
    });
};

function createEmbed(embedConfig, member, status, roles, isRemoval = false) {
    const embed = new EmbedBuilder();

    const rolesText = roles.map(roleId => `<@&${roleId}>`).join(', ');

    const placeholders = {
        '{user}': `<@${member.user.id}>`,
        '{status}': status,
        '{roles}': rolesText
    };

    const placeholdersForTitleAuthorFooter = {
        '{user}': member.displayName,
        '{status}': status,
        '{roles}': rolesText
    };

    if (embedConfig.Title) {
        embed.setTitle(replacePlaceholders(embedConfig.Title, placeholdersForTitleAuthorFooter));
    }

    if (embedConfig.Description) {
        embed.setDescription(embedConfig.Description.map(line => replacePlaceholders(line, placeholders)).join('\n'));
    }

    if (embedConfig.Footer.Text) {
        embed.setFooter({ text: replacePlaceholders(embedConfig.Footer.Text, placeholdersForTitleAuthorFooter), iconURL: embedConfig.Footer.Icon || undefined });
    }

    if (embedConfig.Author.Text) {
        embed.setAuthor({ name: replacePlaceholders(embedConfig.Author.Text, placeholdersForTitleAuthorFooter), iconURL: embedConfig.Author.Icon || undefined });
    }

    if (embedConfig.Color) {
        embed.setColor(embedConfig.Color);
    }

    if (embedConfig.Image) {
        embed.setImage(embedConfig.Image);
    }

    if (embedConfig.Thumbnail) {
        embed.setThumbnail(embedConfig.Thumbnail);
    }

    return embed;
}

function replacePlaceholders(text, placeholders) {
    return text.replace(/{user}|{status}|{roles}/g, (match) => placeholders[match]);
}